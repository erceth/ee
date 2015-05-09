var gulp = require("gulp");
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var mainBowerFiles = require('main-bower-files');

var less = require('gulp-less');
var clean = require('gulp-clean');
var path = require('path');

//gets main files from bower and puts them into lib folder
gulp.task("bower", function(callback) {
    gulp.src(mainBowerFiles({
            paths: {
                bowerDirectory: './bower_components',
                bowerJson: './bower.json'
            }
        }))
        .pipe(gulp.dest("./lib"))
        .on('end', function() {
            console.log("bower done");
            callback();
        }); //announce that you're done
});

gulp.task("concat", ["bower"], function() { //wait for bower task to finish
    console.log("concat start");
    gulp.src(["./lib/jquery.js", "./lib/angular.js", "./lib/angular-ui-router.js", "./lib/*.js"])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("public/"));
    gulp.src(["./src/js/controller/app.js", "./src/js/**/*.js"])
        .pipe(concat("main.js"))
        .pipe(gulp.dest("public/"));
});

gulp.task("less", function() {
    gulp.src(['./bower_components/bootstrap/less/bootstrap.less', "lib/**/*.less"])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat("lib.css"))
        .pipe(gulp.dest('./public'));

    gulp.src("./src/less/main.less")
    	.pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
		.pipe(concat("main.css"))
		.pipe(gulp.dest("./public"));

});

gulp.task("img", function() {
    gulp.src('./src/img/*')
        .pipe(gulp.dest('./public/img'));
});

// gulp.task("css", function() {
// 	gulp.src("./src/css/**/*.css")
// 		.pipe(concat("main.css"))
// 		.pipe(gulp.dest("public/"));
// 	gulp.src("./lib/**/*.css")
// 		.pipe(concat("lib.css"))
// 		.pipe(gulp.dest("public/"));
// });

gulp.task("html", function() {
    gulp.src("./src/index.html")
        .pipe(gulp.dest("public/"));
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("public/html"));
});

gulp.task("fonts", function() {
    gulp.src("./lib/glyphicons*")
        .pipe(gulp.dest("public/fonts/"));
});

gulp.task("jurassic", function() {
    gulp.src("./src/jurassicsystems/**/*")
        .pipe(gulp.dest("public/jurassicsystems"));
});

gulp.task('clean', function ( callback ) {
    return gulp.src(["public", "lib"], {read: false})
        .pipe(clean());
});

gulp.task("watch", function() {
    gulp.watch("./src/**/*", ["bower", "concat", "less", "html", "fonts", "img", "jurassic"]);
});

gulp.task("default", ["bower", "concat", "less", "html", "fonts", "img", "jurassic", "watch"]);
