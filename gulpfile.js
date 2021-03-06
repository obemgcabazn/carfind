'use strict';

var gulp          = require('gulp'),
    sourcemaps    = require('gulp-sourcemaps'),
    autoprefixer  = require('gulp-autoprefixer'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    livereload    = require('gulp-livereload');


gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('frontend/sass/*.sass', gulp.series( 'sass'));
  gulp.watch('public/*.php').on('change', livereload.changed);
  gulp.watch('public/*.css').on('change', livereload.changed);
  gulp.watch('public/*.js').on('change', livereload.changed);
});

gulp.task('sass', function () {
  return gulp.src('frontend/sass/style.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/'));
});

gulp.task(
  'default',
  gulp.series(
    'watch'
  )
);