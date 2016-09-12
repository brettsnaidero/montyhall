var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  gulp.src(['./sass/*.scss', './sass/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps/'))

  .pipe(gulp.dest('../css/'))
});

/**
 * Watch the Sass directory for changes.
 */
gulp.task('watch', function() {
  gulp.watch(['./sass/*.scss', './sass/**/*.scss'], ['sass']);  // If a file changes, re-run 'sass'
});
