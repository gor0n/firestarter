'use strict';

// ==================================================
// Favicons Configuration
// ==================================================

module.exports = () => {
  var paths   = require('../configs/paths');

  var settings = {
    enabled : false,
    picture : paths.src.base + 'favicon/favicon.png',
    data    : paths.src.base + 'favicon/favicon.json',
    dest    : paths.dist.base + '/favicons/',
    design  : {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '0'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#ffffff',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#27ae60',
        backgroundColor: '#ffffff',
        manifest: {
            name: 'Base',
            display: 'browser',
            orientation: 'notSet',
            onConflict: 'override'
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#27ae60'
      }
    }
  };

  return settings;
};
