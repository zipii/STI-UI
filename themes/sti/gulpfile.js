const gulp         = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano      = require('gulp-cssnano'),
      jshint       = require('gulp-jshint'),
      rename       = require('gulp-rename'),
      sass         = require('gulp-sass'),
      uglify       = require('gulp-uglify');

const PATH = {
  SITECSS : {
    src : 'src/scss/site.scss',
    dest: 'static/stylesheets'
  },
  QUESTIONSCSS : {
    src : 'src/scss/questions.scss',
    dest: 'static/stylesheets'
  },
  JS: {
    src: 'src/javascripts/scripts.js',
    dest: 'static/javascripts'
  }
};

gulp.task('siteCss', function () {
    return gulp.src(PATH.SITECSS.src)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(PATH.SITECSS.dest))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.SITECSS.dest))
});

gulp.task('questionsCss', function () {
    return gulp.src(PATH.QUESTIONSCSS.src)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(PATH.QUESTIONSCSS.dest))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.QUESTIONSCSS.dest))
});

gulp.task('js',function(){
  gulp.src(PATH.JS.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(PATH.JS.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.JS.dest))
});

gulp.task('default', ['siteCss', 'questionsCss', 'js'], function () {
    gulp.watch("src/scss/**/*.scss", ['siteCss', 'questionsCss']);
    gulp.watch("src/js/*.js", ['js']);
});

gulp.task('build', ['siteCss', 'questionsCss', 'js']);
