'use strict';

// ==================================================
// Load Modules
// ==================================================

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    notify = require('gulp-notify');

// ==================================================
// Load Configurations
// ==================================================

var build = './frontend/build/';

var paths         = require(build + 'configs/paths'),
    project       = require(build + 'configs/project')(),
    images        = require(build + 'configs/images'),
    styles        = require(build + 'configs/styles'),
    scripts       = require(build + 'configs/scripts')(),
    notifications = require(build + 'configs/notifications');

// ==================================================
// Individual Tasks
// ==================================================

require(build + 'tasks/images');
require(build + 'tasks/styles');
require(build + 'tasks/scripts');
require(build + 'tasks/favicons');
require(build + 'tasks/clean');

// ==================================================
// Bundle Tasks
// ==================================================

// Construct bundle task array
var bundleTask = [];
images.enabled ? bundleTask.push('images') : '';
styles.enabled ? bundleTask.push('styles') : '';
scripts.enabled ? bundleTask.push('scripts') : '';
project.isProd ? bundleTask.push('clean:maps') : '';

gulp.task('default', bundleTask, function() {
  if (!project.isProd && !project.hasError && notifications.enabled) {
    gulp.src('.').pipe(notify({
      sound: notifications.mute ? false : notifications.sound,
      icon: './node_modules/gulp-notify/assets/gulp.png',
      message: 'Dev tasks completed with success'
    }));
  }
});

require(build + 'tasks/watch');
require(build + 'tasks/live');
