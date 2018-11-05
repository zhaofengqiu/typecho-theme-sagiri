var gulp = require('gulp'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  clean = require('gulp-clean'),
  gulpSequence = require('gulp-sequence')

gulp.task('build-scripts', function() {
  return gulp
    .src('js/!(*.min).js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js'))
})

gulp.task('build-css', function() {
  return gulp
    .src('css/!(*.min).css')
    .pipe(cleanCSS())
    .pipe(autoprefixer({ browsers: ['last 3 versions'], cascade: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'))
})

gulp.task('build-util', function() {
  return gulp
    .src('util/!(*.min).js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('util'))
})

gulp.task('start', function() {
  gulp.watch(
    ['js/!(*.min).js', 'css/!(*.min).css', 'util/!(*.min).js'],
    ['build']
  )
})

gulp.task('build', function() {
  gulpSequence(
    'build-scripts',
    'build-css',
    'build-util',

    function(err) {
      console.log(err)
    }
  )
})
