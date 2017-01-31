var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
// var csswring = require('csswring'); // Minify CSS using PostCSS
var autoprefixer = require('autoprefixer');
var lost = require('lost'); // lost grid system for postcss
var pug = require('gulp-pug');
var rucksack = require('rucksack-css');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug'], function() {
  browserSync.init({
    server: {
      baseDir: "./dest"
    }
  });

  gulp.watch("./src/styles.sass", ['sass']);
  gulp.watch("./src/index.pug", ['pug']);
});

gulp.task('sass', function(){
  var processors = [
    lost,
    rucksack,
    autoprefixer({browsers: ['last 2 versions']})
  ];

  return gulp.src('./src/styles.sass')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'))
    .pipe(browserSync.stream());
});

gulp.task('pug', function(){
  return gulp.src('./src/index.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('./dest'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
