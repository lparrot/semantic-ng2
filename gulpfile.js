var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var strip_js = require('gulp-strip-comments');
var strip_css = require('gulp-strip-css-comments');
var minify_js = require('gulp-minify');
var minify_css = require('gulp-minify-css');

gulp.task('default', ['js', 'css', 'copy']);

gulp.task('bundle', ['bundle']);

gulp.task('js', ["build_js:angular2", 'build_js:demo']);

gulp.task('css', ['build_css:vendors', 'build_css:demo', 'build_css:semantic-ng2']);

gulp.task('copy', ['copy:fonts', 'copy:images']);

gulp.task('clean', function () {
    return del.sync([
        'build/**/*',
        // 'node_modules/**/*',
        'typings/**/*',
        'vendors/**/*'
    ])
});

gulp.task('build_js:angular2', function () {
    return gulp.src([
        './node_modules/core-js/client/shim.min.js',
        './node_modules/zone.js/dist/zone.js',
        './node_modules/reflect-metadata/Reflect.js',
        './node_modules/systemjs/dist/system.src.js'
    ])
        .pipe(concat('angular2.js'))
        .pipe(strip_js())
        .pipe(minify_js())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('src:vendors', function () {
    return gulp.src([
        './vendors/jquery/dist/jquery.js',
        './vendors/lodash/dist/lodash.js',
        './vendors/JavaScript-MD5/js/md5.js',
        './vendors/semantic/dist/semantic.js',
        './vendors/toastr/toastr.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(replace('module.error(error.pusher);', ''))
        .pipe(replace('module.error(error.movedSidebar, element);', ''))
        .pipe(strip_js())
        .pipe(minify_js())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('build_js:demo', ['src:vendors'], function () {
    return gulp.src([
        './build/js/vendors.js',
        './vendors/faker/build/build/faker.js'
    ])
        .pipe(concat('demo.js'))
        .pipe(replace('module.error(error.pusher);', ''))
        .pipe(replace('module.error(error.movedSidebar, element);', ''))
        .pipe(strip_js())
        .pipe(minify_js())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('build_css:vendors', function () {
    return gulp.src([
        './vendors/semantic/dist/semantic.css',
        './vendors/toastr/toastr.css'
    ])
        .pipe(concat('vendors.css'))
        .pipe(strip_css())
        .pipe(minify_css({processImport: false}))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('build_css:demo', function () {
    return gulp.src([
        './app/app.scss'
    ])
        .pipe(sass())
        .pipe(concat('demo.css'))
        .pipe(strip_css())
        .pipe(autoprefixer())
        .pipe(minify_css({processImport: false}))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('build_css:semantic-ng2', function () {
    return gulp.src([
        './src/all.scss'
    ])
        .pipe(sass())
        .pipe(strip_css())
        .pipe(autoprefixer())
        .pipe(rename('semantic-ng2.css'))
        .pipe(minify_css({processImport: false}))
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('copy:fonts', function () {
    return gulp.src([
        './vendors/semantic/dist/themes/default/assets/fonts/**'
    ])
        .pipe(filter(['**/*.{eot,svg,ttf,woff,woff2}']))
        .pipe(gulp.dest('./build/css/themes/default/assets/fonts/'))
});

gulp.task('copy:images', function () {
    return gulp.src([
        './vendors/semantic/dist/themes/default/assets/images/**'
    ])
        .pipe(gulp.dest('./build/css/themes/default/assets/images/'))
});