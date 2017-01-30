var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
// var csswring = require('csswring'); // Minify CSS using PostCSS
var autoprefixer = require('autoprefixer-core');
var lost = require('lost'); // lost grid system for postcss

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./styles.sass", ['sass']);
  gulp.watch("./index.html").on('change', browserSync.reload);
});

gulp.task('sass', function(){
  var processors = [
    lost,
    autoprefixer({browsers: ['last 2 version']})
  ];

  return gulp.src('./styles.sass')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
