var gulp = require('gulp');
var less = require('gulp-less');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var gutil = require('gulp-util');
var path = require('path');
var minimist = require('minimist');
var watch = require('gulp-watch');

gulp.task('initEnv', function () {
    var options = minimist(process.argv.slice(2), {
        string: ['module'],
        default: {
            module: "pager"
        }
    });
    process.env.MODULE = options.module;
});

gulp.task('less', function () {
    return gulp.src('./src/' + process.env.MODULE + '/*.less')
        .pipe(less())
        .pipe(gulp.dest('./release/' + process.env.MODULE + '/'));
});

gulp.task('watch', function () {
    watch('./src/' + process.env.MODULE + '/' + process.env.MODULE + '.less', function () {
        gulp.start('less');
    });
    watch('./src/' + process.env.MODULE + '/' + process.env.MODULE + '.js', function () {
        gulp.start('webpack');
    })
});

gulp.task('webpack', function (callback) {
    webpack(webpackConfig(process.env.MODULE), function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    })
});

gulp.task('build', ['less', 'webpack'], function () {
    gulp.start('watch');
});

gulp.task('default', ['initEnv'], function () {
    gulp.start('build');
});
