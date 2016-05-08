'use strict';

// ==================================================
// Load Modules
// ==================================================

var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    cssnano         = require('cssnano'),
    responsiveType  = require('postcss-responsive-type'),
    quantityQueries = require('postcss-quantity-queries'),
    sourcemaps      = require('gulp-sourcemaps'),
    uglify          = require('gulp-uglify'),
    gutil           = require('gulp-util'),
    notify          = require('gulp-notify');

// ==================================================
// Load Configurations
// ==================================================

var paths         = require('../configs/paths'),
    project       = require('../configs/project')(),
    styles        = require('../configs/styles'),
    notifications = require('../configs/notifications');

// ==================================================
// Tasks
// ==================================================

gulp.task('styles', function() {
  var postcssPlugins = [
    autoprefixer({
      browsers: styles.autoprefixer
    }),
    responsiveType(),
    quantityQueries()
  ];

  project.isProd ? postcssPlugins.push(cssnano) : '';

  return gulp.src(paths.src.styles + 'styles.scss')
    .pipe(!project.isProd && styles.maps ? sourcemaps.init() : gutil.noop())
    .pipe(sass.sync().on('error', sass.logError))
    .on('error', !project.isProd && notifications.enabled ? notify.onError({
      sound: notifications.mute ? false : notifications.soundEr,
      message: function(file) {
        project.hasError = true;
        return file.file.split("/").pop() + ' failed SASS compilation';
      }
    }) : function() { gutil.noop(); })
    .pipe(postcss(postcssPlugins))
    .pipe(!project.isProd && styles.maps ? sourcemaps.write('./') : gutil.noop())
    .pipe(gulp.dest(paths.dist.styles));
});
