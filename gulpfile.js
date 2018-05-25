var gulp = require('gulp');
var less = require('gulp-less');
var squence = require('gulp-sequence');
var server = require('gulp-webserver');
var homeData = require('./src/data/home.json');
var mock = require("./src/data/mock");
var url = require('url');
var bscroll = require('./src/js/lib/bscroll.min')
gulp.task('testless', function() {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest("src/css"))
});
gulp.task('change', function() {
    gulp.watch("./src/css/*.less", ["testless"])
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8008,
            host: "localhost",
            // livereload: true,
            // open: true,
            middleware: function(req, res, next) {
                var uname = url.parse(req.url, true);
                if (/\/book/g.test(uname.pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                }
                next();
            }
        }))
});
gulp.task('default', function(cd) {
    squence("change", "server", cd)
})