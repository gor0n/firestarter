'use strict';

// ==================================================
// Load Modules
// ==================================================

var gulp   = require('gulp'),
    notify = require('gulp-notify');

// ==================================================
// Load Configurations
// ==================================================

var paths         = require('../configs/paths'),
    project       = require('../configs/project')(),
    styles        = require('../configs/styles'),
    scripts       = require('../configs/scripts'),
    notifications = require('../configs/notifications');

// ==================================================
// Tasks
// ==================================================

gulp.task('watch', function() {
    // Styles
    if (styles.enabled) {
      gulp.watch(paths.src.styles + '/**/*.scss', ['styles', function() {
        if (notifications.enabled && !project.hasError) {
          gulp.src('.').pipe(notify({
              sound: notifications.mute ? false : notifications.sound,
              icon: './node_modules/gulp-notify/assets/gulp.png',
              message: 'SASS files compiled',
            }));
        }

        project.hasError = false;  // reinit variable before next watch task
      }]);
    }

    // Scripts
    if (scripts.enabled) {
      gulp.watch(paths.src.scripts + '**/*.js', ['scripts', function() {
        if (notifications.enabled && !project.hasError) {
          gulp.src('.').pipe(notify({
            sound: notifications.mute ? false : notifications.sound,
            icon: './node_modules/gulp-notify/assets/gulp.png',
            message: 'JS files concatened',
          }));
        }

        project.hasError = false;
      }]);
    }
});
