(function() {
  'use strict';

  document.addEventListener("DOMContentLoaded", function() {
    var icons = this.querySelectorAll('.icon');
    var toggleActive = function() {
      this.classList.toggle('is-active');
    };

    for (var i = 0; i < icons.length; i++) {
      icons[i].addEventListener('click', toggleActive);
    }
  });
}());
