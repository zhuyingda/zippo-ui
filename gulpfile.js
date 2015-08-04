var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function () {
  gulp.src('./src/pager/pager.less')
    .pipe(less())
    .pipe(gulp.dest('./release/pager/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('default', ['less'], function () {
  gulp.start('watch');
});