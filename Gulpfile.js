'use strict';
var gulp = require('gulp');
var del = require('del');
var browserify = require('gulp-browserify');

gulp.task('clean', function () {
    return del([
        'dist'
    ]);
});

gulp.task('default', ['clean'], function () {
    gulp.src('src/index.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        })).pipe(gulp.dest('dist'));
});