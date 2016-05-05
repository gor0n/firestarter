'use strict';

// ==================================================
// Load modules
// ==================================================

var gulp     = require('gulp'),
    imagemin = require('gulp-imagemin'),
    changed  = require('gulp-changed');

// ==================================================
// Load configurations
// ==================================================

var paths  = require('../configs/paths'),
    images = require('../configs/images');

// ==================================================
// Tasks
// ==================================================

gulp.task('images', function () {
  return gulp.src(paths.src.images + '**/*.{'+ images.extensions +'}')
    .pipe(changed(paths.dist.images))
    .pipe(images.optimize ? imagemin(images.optimizeOpts) : gutil.noop())
    .pipe(gulp.dest(paths.dist.images));
});
