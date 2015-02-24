var gulp = require("gulp");
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var mainBowerFiles = require('main-bower-files');

var less = require('gulp-less');
var path = require('path');

//gets main files from bower and puts them into lib folder
gulp.task("bower", function() {
	gulp.src(mainBowerFiles())
		.pipe(gulp.dest("./lib"));
});

gulp.task("concat", function() {
	gulp.src(["./lib/jquery.js", "./lib/angular.js", "./lib/angular-ui-router.js", "./lib/*.js"])
		.pipe(concat("lib.js"))
		.pipe(gulp.dest("public/"));
	gulp.src("./src/js/**/*.js")
		.pipe(concat("main.js"))
		.pipe(gulp.dest("public/"));
});

gulp.task("less", function() {
	gulp.src('./src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat("main.css"))
    .pipe(gulp.dest('./public'));
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

gulp.task("watch", function() {
	gulp.watch("./src/**/*", ["bower", "concat", "less", "html", "fonts", "img"]);
});

gulp.task("default", ["bower", "concat", "less", "html", "fonts", "img", "watch"]);
