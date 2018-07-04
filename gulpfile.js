var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    nano = require('gulp-cssnano'),
    uncss = require('gulp-uncss'),
    autopreixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
    return gulp.src(['assets/scss/app.scss'])
        .pipe(sass())
        .pipe(autopreixer({browsers: ['last 2 versions']}))
        .pipe(nano())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function(){
    return gulp
        .src(['assets/js/**/**/*.js'])
        .pipe(uglify())
        // .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('connect', function () {
    connect.server({}, function (){
        browserSync.init({
            proxy: "127.0.0.1:8000"
        });
    });
});

gulp.task('watch-build', function(){
    gulp.watch('assets/js/**/**/*.js', ['scripts']);
    gulp.watch('assets/scss/**/**/*.scss', ['styles']);
    gulp.watch(['**/*.php', '**/*.html', 'dist/**/*.css', 'dist/**/*.js']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts','connect']);
gulp.task('watch', ['default', 'watch-build']);