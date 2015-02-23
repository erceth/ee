var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var winston = require('winston');

winston.add(winston.transports.File, { filename: 'sitesSearched.log' });
winston.remove(winston.transports.Console);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

var crawlCoolDown = false;
var crawlCoolDownTime = 3000;
app.get('/crawl', function(req, res) {
    //prevent rapid crawling
    if (crawlCoolDown) {
        res.json({error:"true", message:"waiting for cooldown.  Try again in a few seconds."});
        return;
    }
    crawlCoolDown = true;
    setTimeout(function() {
        crawlCoolDown = false;
    }, crawlCoolDownTime);
    var url = req.query.url;
    var ignoreStopWords = (req.query.ignoreStopWords === "true");
    winston.info(url); //keep track of all sites searched
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (url && url.match(regex)) {
        var database = [];
        var stopwords = ["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"];

        request(url, function(err, resp, body) { //fetch html
            if (err) {
                throw err;
            }
            cheer = cheerio.load(body); //load into a dom


            cheer("div, span, a, p, title, th, td, label, option, li, h1, h2, h3, h4, h5, h6").each(function() {
                var text = cheer(this).text();

                text = text.split(/\s+/); //split words on whitespace

                text = text.filter(function(str) { //filter out whitespace
                    return /\S/.test(str);
                });

                
                for (var i = 0; i < text.length; i++) {
                    key = text[i].toLowerCase();

	                if (ignoreStopWords && _.contains(stopwords, key)) {
	                	continue;
	                }

                    var exists = _.find(database, function(entry) {
                    	return entry.word === key;
                    });

                    if (exists) {
                    	exists.count = exists.count + 1;
                    } else {
                    	database.push({word: key, count: 1});
                    }
                }


            });
            res.json({results:database});
        });

    } else {
    	res.json({error:"true", message:"improper url"});
    }



});

var server = app.listen(8001, function() {
    console.log("listening on port 8001");
});
