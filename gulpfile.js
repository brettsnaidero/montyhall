var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var gutil = require('gulp-util');
var webpack = require('webpack');

var sassPaths = [
	'bower_components/foundation-sites/scss'
	// 'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
	return gulp.src('./sass/*.scss')
		// Init source maps
		.pipe($.sourcemaps.init())
		// SASS it up
		.pipe($.sass({
			includePaths: sassPaths,
			outputStyle: 'expanded'
		})
		.on('error', $.sass.logError))
		// Autoprefix
		.pipe($.autoprefixer({
			browsers: ['last 2 versions', 'ie >= 8']
		}))
		// Write sourcemaps
	    .pipe($.sourcemaps.write('.'))
		// Output to CSS folder
	    .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['sass'], function() {
	gulp.watch(
		['./sass/**/*.scss'],
		['sass']
	);
});
