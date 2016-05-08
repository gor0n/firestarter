'use strict';

// ==================================================
// Load Modules
// ==================================================

var gulp       = require('gulp'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    globby     = require('globby'),
    through    = require('through2'),
    stripDebug = require('gulp-strip-debug'),
    uglify     = require('gulp-uglify'),
    eslint     = require('gulp-eslint'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil      = require('gulp-util'),
    cache      = require('gulp-cached'),
    notify     = require('gulp-notify');

// ==================================================
// Load Configurations
// ==================================================

var paths         = require('../configs/paths'),
    project       = require('../configs/project')(),
    scripts       = require('../configs/scripts')(),
    notifications = require('../configs/notifications');

// ==================================================
// Tasks
// ==================================================

gulp.task('scripts', !project.isProd && scripts.lint ? ['scripts:lint'] : '', function () {
  var bundledStream = through();

  bundledStream
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(!project.isProd && scripts.maps ? sourcemaps.init() : gutil.noop())
    .pipe(project.isProd ? stripDebug() : gutil.noop())
    .pipe(project.isProd && scripts.uglify ? uglify() : gutil.noop())
    .pipe(!project.isProd && scripts.maps ? sourcemaps.write('./') : gutil.noop())
    .pipe(gulp.dest(paths.dist.scripts));

  globby(scripts.files).then(function(entries) {
    var browserified = browserify({
      entries: entries,
      debug: true
    });

    if (scripts.babel) {
      browserified
        .transform('babelify', {presets: ['es2015']})
    }

    browserified
      .bundle()
      .pipe(bundledStream);

  }).catch(function(err) {
    bundledStream.emit('error', err);
  });

  return bundledStream;
});

gulp.task('scripts:lint', function() {
    var files = [];
    var nbErrors = 0;
    var nbWarnings = 0;
    var msgJs = '';

    return gulp.src(scripts.files)
      .pipe(cache('eslint'))
      .pipe(eslint({
        extends: 'eslint:recommended',
        parser: 'babel-eslint',
        rules: scripts.lintRules,
        globals: {
          'jQuery': false,
          '$': true
        },
        env: {
          'browser': true,
          'node': true
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.results(function(results) {
        // count errors/warnings and get relative path of files failing linting
        nbErrors = results.errorCount;
        nbWarnings = results.warningCount;

        if (results.errorCount > 0 || results.warningCount > 0) {
          project.hasError = true;
        }

        results.forEach(function(res) {
          if ( res.errorCount > 0 ||  res.warningCount > 0 ) {
            files.push(res.filePath.split('/').pop());
          }
        });
      }))
      .pipe(notifications.enabled ? notify({
        title: 'Error running Gulp',
        sound: notifications.mute ? false : notifications.soundEr,
        icon: './node_modules/gulp-notify/assets/gulp-error.png',
        onLast: true,
        message: function(file) {
          // construct message and send it if has errors
          // this function will be executed only on last file
          if (project.hasError) {
            msgJs = files.join(', ');

            if (files.length > 1) {
              msgJs = files.length + ' files (' + msgJs + ')';
            }

            msgJs += ' failed JS linting with ';

            if (nbErrors > 0) {
              msgJs += nbErrors + ' error';
              if ( nbErrors > 1 ) msgJs += 's';

              if (nbWarnings > 0) {
                msgJs += ' and ' + nbWarnings + ' warning';

                if (nbWarnings > 1) msgJs += 's';
              }
            } else if (nbWarnings > 0) {
              msgJs += nbWarnings + ' warning';

              if (nbWarnings > 1) msgJs += 's';
            }

            return msgJs;
          }
        }
      }) : gutil.noop())
      .pipe(eslint.failAfterError());
});
