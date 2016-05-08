'use strict';

// ==================================================
// Scripts Configuration
// ==================================================

module.exports = () => {
  var paths = require('../configs/paths');

  var scripts = {
    enabled: true,
    maps: true,
    lint: true,
    babel: false,
    uglify: true,
    files: [
      paths.src.scripts + 'components/*.js',
      paths.src.scripts + 'main.js'
    ],
    lintRules: {
      'indent': [1, 2],
      'no-undef': 1,
      'no-unused-vars': 1,
      'no-extra-semi': 0,
      'no-console': 0
    }
  };

  return scripts;
};
