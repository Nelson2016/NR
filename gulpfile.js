const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const replace = require('gulp-replace');

gulp.task('default', ['script', 'style', 'asset:style', 'asset:font']);

gulp.task('script', function () {
    return gulp.src(['components/**/*.js', 'components/**/*.jsx'])
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(replace('.scss', '.css'))
        .pipe(gulp.dest('dist/components/'))
});

gulp.task('style', function () {
    return gulp.src('components/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/components/'))
});

gulp.task('asset:style', function () {
    return gulp.src('asset/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/asset/'))
});

gulp.task('asset:font', function () {
    return gulp.src('asset/font/*')
        .pipe(gulp.dest('dist/asset/font'))
});