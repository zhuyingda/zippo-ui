var gulp = require('gulp');
var less = require('gulp-less');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var gutil = require('gulp-util');
var path = require('path');
var minimist = require('minimist');

gulp.task('initEnv', function () {
    var options = minimist(process.argv.slice(2), {
        string: ['wgt'],
        default: {
            wgt: "pager"
        }
    });
    process.env.WGT = options.wgt;
});

gulp.task('less', function () {
    return gulp.src('./src/' + process.env.WGT + '/*.less')
        .pipe(less())
        .pipe(gulp.dest('./release/' + process.env.WGT + '/'));
});

//gulp.task('watch', function () {
//  gulp.watch('./src/**/*.less', ['less']);
//});

gulp.task('webpack', function (callback) {
    webpack(webpackConfig(process.env.WGT), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    })
});

gulp.task('default', ['initEnv'], function () {
    gulp.start('webpack');
});
