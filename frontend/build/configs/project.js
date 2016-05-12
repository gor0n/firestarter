'use strict';

// ==================================================
// Project Configuration
// ==================================================

module.exports = () => {
  var gutil = require('gulp-util');

  var settings = {
    hasError: false,
    isProd: gutil.env.prod === undefined ? false : true
  };

  return settings;
};
