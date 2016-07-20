import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

gulp.task('scripts', () => {
  return browserify('./public/scripts/index.js')
    .transform(babelify)
    .bundle()
    .on('error', e => {
      gutil.log(e);
    })
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts/dist'))
});

gulp.task('styles', () => {

});

gulp.task('default', ['scripts', 'styles']);
