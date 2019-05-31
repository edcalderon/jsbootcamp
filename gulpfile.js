const gulp = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

const SCRIPTS_SRC = './src/**/*.js';
const STYLES_SRC = './src/scss/*.scss';

function scripts() {
    return gulp.src(SCRIPTS_SRC)
        .pipe(concat('app.js'))
        .pipe(minify({
            noSource: false
        }))
        .pipe(gulp.dest('dist/js'));
}

function styles() {
    return gulp.src(STYLES_SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}

function watch_files() {
    gulp.watch(SCRIPTS_SRC, gulp.series(scripts));
    gulp.watch(STYLES_SRC, gulp.series(styles));
}

gulp.task('default', gulp.parallel(scripts, styles));
gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('watch', gulp.series(watch_files));
