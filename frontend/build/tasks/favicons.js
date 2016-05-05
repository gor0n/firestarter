// ==================================================
// Load modules
// ==================================================

var gulp        = require('gulp'),
    realFavicon = require('gulp-real-favicon'),
    fs          = require('fs'),
    notify     = require('gulp-notify');

// ==================================================
// Load configurations
// ==================================================

var paths         = require('../configs/paths'),
    project       = require('../configs/project')(),
    favicons      = require('../configs/favicons')(),
    notifications = require('../configs/paths');

// ==================================================
// Tasks
// ==================================================

gulp.task('favicons', function(done) {
  try {
    fs.accessSync(paths.src.base + 'favicon/favicon.png', fs.F_OK);
  } catch(e) {
    project.hasError = true;
  }

  if (project.hasError && notifications.enabled) {
    gulp.src('.').pipe(notify({
      title: 'Error running Gulp',
      sound: notifications.mute ? false : notifications.soundEr,
      icon: './node_modules/gulp-notify/assets/gulp-error.png',
      message: 'Favicon.png is required'
    }));
  }

  realFavicon.generateFavicon({
    masterPicture: favicons.picture,
    dest: favicons.dest,
    iconsPath: '/',
    design: favicons.design,
    settings: {
		scalingAlgorithm: 'Mitchell',
		errorOnImageTooSmall: true
	},
    markupFile: favicons.data
  });
});
