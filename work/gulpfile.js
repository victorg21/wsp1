const gulp = require('gulp');
const minify = require('gulp-minify');
const uglify = require('gulp-uglify');
//const gutil = require('gulp-util');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const babelcore = require('babel-core');

// Concatenate & Minify JS
gulp.task('scripts', function() {
    console.log("Start minify...")
    return gulp.src('meeting1/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('meeting1/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['scripts', 'watch']);
