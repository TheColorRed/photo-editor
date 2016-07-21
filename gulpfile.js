var gulp = require('gulp');
var tsc = require('gulp-tsc');
var browserify = require('browserify');
var tsify      = require('tsify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

gulp.task('build-client', () => {
    return browserify()
        .add('./src/client/main.ts')
        .plugin(tsify)
        .bundle()
        .on('error', e => {
            console.log(e);
        })
        .pipe(source('client.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build/client/'));
});

gulp.task('build-server', () => {
    return gulp
        .src(['./src/server/app.ts'])
        .pipe(tsc())
        .pipe(gulp.dest('build/server/'));
});

gulp.task('build', ['build-client', 'build-server']);