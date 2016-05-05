'use strict';

// ==================================================
// Project configuration
// ==================================================

module.exports = () => {
  var gutil = require('gulp-util');

  var project = {
    hasError: false,
    isProd: gutil.env.prod === undefined ? false : true
  };

  return project;
};
