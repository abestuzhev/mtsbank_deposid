
//gulp-sass gulp-autoprefixer gulp-plumber gulp-livereload browser-sync gulp-cssmin gulp-rename
//plugins for development
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();


var srcDir = 'src/';

gulp.task('sass', function(){
    return gulp.src('css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 3 version'))
        .pipe(cssmin())
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
});

gulp.task('js', function(){
    return gulp.src('js/**/*.js')
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream())
});

gulp.task('html', function(){
    return gulp.src('**/*.html')
        .pipe(browserSync.stream())
});

gulp.task('css', function(){
    return gulp.src('css/style.css')
        .pipe(browserSync.stream())
});


gulp.task('browser-sync', function(){
    browserSync.init({
        port: 8081,
        server: {
            baseDir: './'
        }
    })
});

gulp.task('connect', function() {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('watch', function(){
    gulp.watch('css/style.scss', ['sass'])
    gulp.watch(srcDir + 'js/**/*.js', ['js'])
    gulp.watch('**/*.html', ['html'])
    gulp.watch('css/**/*.css', ['css'])
});

gulp.task('default', ['html', 'css', 'sass', 'js', 'browser-sync', 'watch'])
