// ==================================================
// Load Modules
// ==================================================

var gulp           = require('gulp'),
    changed        = require('gulp-changed');

// ==================================================
// Load Configurations
// ==================================================

var paths = require('../configs/paths'),
    fonts = require('../configs/fonts');

// ==================================================
// Tasks
// ==================================================

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts + '**/*.{'+ fonts.extensions +'}')
        .pipe(changed(paths.dist.fonts))
        .pipe(gulp.dest(paths.dist.fonts));
});
