var gulp = require('gulp')
var less = require('gulp-less')
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var webpack = require('gulp-webpack')
var path = require('path')

var webpackConfig = require('./webpack.config.js')

const DIR = {
    JS: './src/',
    LESS: './styles/',
    DEST: './public/'
};

const SRC = {
    JS: DIR.JS + '*.js',
    LESS: DIR.LESS + '*.less'
};

const ENTRY = {
    JS: DIR.JS + 'main.js',
    LESS: DIR.LESS + 'styles.less'
};

const DEST = {
    JS: DIR.DEST + 'js',
    LESS: DIR.DEST + 'css'
};

// webpack
gulp.task('webpack:build', () => {
    return gulp.src(ENTRY.JS)
    .pipe(sourcemaps.init({debug:true}))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(DEST.JS))
    .pipe(sourcemaps.write())
});

gulp.task('webpack:prod', () => {
    return gulp.src(ENTRY.JS)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(DEST.JS))
});

// less
gulp.task('less:build', () => {
    return gulp.src(ENTRY.LESS)
    .pipe(sourcemaps.init({debug:true}))
    .pipe(plumber())
    .pipe(less({paths:[DIR.LESS]}))
    .pipe(prefix(lessPrefix))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST.LESS))
})

gulp.task('less:prod', () => {
    return gulp.src(ENTRY.LESS)
    .pipe(plumber())
    .pipe(less({paths:[DIR.LESS]}))
    .pipe(prefix(lessPrefix))
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(DEST.LESS))
})

// watch
gulp.task('webpack:watch', () => {
    gulp.watch(SRC.JS, ['webpack:build'])
})

gulp.task('less:watch', () => {
    gulp.watch(SRC.LESS, ['less:build'])
})

// task
gulp.task('default',['less:watch','less:build','webpack:watch','webpack:build'], () => {
    console.log('Gulp is running. Task name is default.')
})
gulp.task('build',['less:build','webpack:build'], () => {
    console.log('Finished "build" task.')
})
gulp.task('prod',['less:prod','webpack:prod'], () => {
    console.log('Finished "prod" task.')
})

// options
const lessPrefix = {
    browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
    ],
    cascade: false
}
