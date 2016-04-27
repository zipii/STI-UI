const gulp         = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano      = require('gulp-cssnano'),
      jshint       = require('gulp-jshint'),
      rename       = require('gulp-rename'),
      sass         = require('gulp-sass'),
      uglify       = require('gulp-uglify');

const PATH = {
  siteCSS: {
    src : 'stylesheets/vendor/**/*.css',
    dest: 'build/site/stylesheets/vendor'
  },
  questionnaireCSS: {
    src : 'stylesheets/vendor/**/*.css',
    dest: 'build/questionnaire/stylesheets/vendor'
  },
  siteSCSS : {
    src : 'stylesheets/site/site.scss',
    dest: 'build/site/stylesheets'
  },
  questionnaireSCSS : {
    src : 'stylesheets/questionnaire/questionnaire.scss',
    dest: 'build/questionnaire/stylesheets'
  },
  siteJS: {
    src:  ['scripts/shared/**/*.js', 'scripts/vendor/**/*.js', 'scripts/site/**/*.js'],
    dest: 'build/site/scripts'
  },
  questionnaireJS: {
    src:  ['scripts/shared/**/*.js', 'scripts/vendor/**/*.js', 'scripts/questionnaire/**/*.js'],
    dest: 'build/questionnaire/scripts'
  }
};

gulp.task('siteSCSS', function () {
    return gulp.src(PATH.siteSCSS.src)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(PATH.siteSCSS.dest))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.siteSCSS.dest));
});

gulp.task('questionnaireSCSS', function () {
    return gulp.src(PATH.questionnaireSCSS.src)
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(PATH.questionnaireSCSS.dest))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.questionnaireSCSS.dest));
});

gulp.task('siteJS',function(){
  gulp.src(PATH.siteJS.src)
    .pipe(gulp.dest(PATH.siteJS.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.siteJS.dest));
});

gulp.task('questionnaireJS',function() {
  gulp.src(PATH.questionnaireJS.src)
    .pipe(gulp.dest(PATH.questionnaireJS.dest))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATH.questionnaireJS.dest));
});

gulp.task('siteCSS', function() {
  gulp.src(PATH.siteCSS.src)
    .pipe(gulp.dest(PATH.siteCSS.dest));
});

gulp.task('questionnaireCSS', function() {
  gulp.src(PATH.questionnaireCSS.src)
    .pipe(gulp.dest(PATH.questionnaireCSS.dest));
});

function copy_assets(directoryName) {
  return gulp.src(directoryName + '/**/*')
              .pipe(gulp.dest('build/site/' + directoryName))
              .pipe(gulp.dest('build/questionnaire/' + directoryName));
}

gulp.task('images', function() {
  return copy_assets('images');
});

gulp.task('fonts', function() {
  return copy_assets('fonts');
});

gulp.task('icons', function() {
  return copy_assets('icons');
});

gulp.task('default', ['icons', 'fonts', 'images', 'siteCSS', 'questionnaireCSS', 'siteSCSS', 'questionnaireSCSS', 'siteJS', 'questionnaireJS'], function () {
    gulp.watch("stylesheets/**/*.css",  ['siteCSS', 'questionnaireCSS']);
    gulp.watch("stylesheets/**/*.scss", ['siteSCSS', 'questionnaireSCSS']);
    gulp.watch("scripts/**/*.js", ['siteJS', 'questionnaireJS']);
    gulp.watch("images/**/*", ['images']);
    gulp.watch("fonts/**/*", ['fonts']);
    gulp.watch("icons/**/*", ['icons']);
});

gulp.task('build', ['images', 'fonts', 'icons', 'siteCSS', 'questionnaireCSS', 'siteSCSS', 'questionnaireSCSS', 'siteJS', 'questionnaireJS']);
