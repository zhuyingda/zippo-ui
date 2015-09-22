var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function () {
  //gulp.src('./zhubo.less')
  //  .pipe(less())
  //  .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('default', ['less'], function () {console.log(13)
  gulp.start('watch');
});
