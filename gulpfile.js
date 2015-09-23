var gulp = require('gulp');
var less = require('gulp-less');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var path = require('path');
var minimist = require('minimist');

gulp.task('initEnv', function() {
  var options = minimist(process.argv.slice(2), {
    string: ['page'],
    default: {
      page: "hall"
    }
  });
  process.env.PAGE = options.page;
});

gulp.task('less', function () {
  return gulp.src('./src/' + process.env.PAGE + '/*.less')
          .pipe(less())
          .pipe(gulp.dest('./release/' + process.env.PAGE + '/'));
});

//gulp.task('watch', function () {
//  gulp.watch('./src/**/*.less', ['less']);
//});

gulp.task('webpack', function () {
  webpack(webpackConfig, function () {
    console.log(1);
  })
});

gulp.task('default', ['initEnv'], function () {
  gulp.start('webpack');
});
