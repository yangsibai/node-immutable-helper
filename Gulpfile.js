'use strict';
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function () {
    return del([
        'dist'
    ]);
});

gulp.task('default', ['clean'], function () {
    return gulp.src('src/index.js').pipe(gulp.dest('dist'));
});