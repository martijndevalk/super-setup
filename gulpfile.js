var gulp             = require('gulp'),
    fileinclude      = require('gulp-file-include'),
    runSequence      = require('run-sequence'),
    browserify       = require('browserify'),
    babelify         = require('babelify'),
    changed          = require('gulp-changed'),
    source           = require('vinyl-source-stream'),
    buffer           = require('vinyl-buffer'),
    rename           = require('gulp-rename'),
    uglify           = require('gulp-uglify'),
    stripDebug       = require('gulp-strip-debug'),
    sourcemaps       = require('gulp-sourcemaps'),
    del              = require('del'),
    environments     = require('gulp-environments'),
    sass             = require('gulp-sass'),
    cleanCSS         = require('gulp-clean-css'),
    postcss          = require('gulp-postcss'),
    autoprefixer     = require('autoprefixer'),
    imagemin         = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    notify           = require('gulp-notify'),
    plumber          = require('gulp-plumber'),
    browserSync      = require('browser-sync').create(),
    watch            = require('gulp-watch'),
    svgstore         = require('gulp-svgstore'),
    svgmin           = require('gulp-svgmin'),
    gutil            = require('gulp-util'),
    size             = require('gulp-size'),
    path             = require('path');

var development = environments.development;
var production = environments.production;

// Error handling
function errorAlert(error) {
    notify.onError({
        title: "Error",
        message: "Check your terminal"
    })(error);
    console.log(error.toString());
    this.emit('end');
}

// Clean dist folder
gulp.task('clean-dist', function () {
    return del('./dist/**', { force: true });
});

// Javascript
// Transpiling ES6 Modules to CommonJS Using Babel & Gulp

gulp.task('build-js', function() {

    var b = browserify({
        entries: './src/js/entry.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify]
    });

    return b.bundle()
    .on('error', function(error) {
        notify.onError({
            title: "Error",
            message: "Check your terminal"
        })(error);
        console.log(error.toString());
        this.emit('end');
    })
    .pipe(source('entry.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(rename('bundle.js'))
    .pipe(production(stripDebug()))
    .pipe(production(uglify()))
    .pipe(production(size({
        title: '[JAVASCRIPT FILE SIZE]',
        pretty: true,
        showFiles: true,
        showTotal: false,
        gzip: true
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


// CSS
// Compile Sass files

gulp.task('build-styles', function () {
    return gulp.src('./src/**/main.scss')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({
        browsers: ['ie >= 9', 'iOS >= 7', 'Firefox > 20', 'Safari >= 8'],
    })]))
    .pipe(production(cleanCSS()))
    .pipe(production(size({
        title: '[CSS FILE SIZE]',
        pretty: true,
        showFiles: true,
        showTotal: false,
        gzip: true
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});


// HTML
gulp.task('build-content', function() {
  return gulp.src('./src/**/*.html')
  .pipe(plumber({errorHandler: errorAlert}))
  .pipe(changed('./dist/'))
  .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
  }))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});

// HTML INCLUDES
gulp.task('build-include', function() {
  return gulp.src('./src/**/*.html')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(changed('./dist/', {hasChanged: changed.compareSha1Digest}))
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

// Optimizing Images
gulp.task('build-img', function() {
    return gulp.src('./src/img/**/*.+(png|gif|jpg)')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(production(imagemin({
        interlaced: true,
        progressive: true,
        use: [imageminPngquant()]
    })))
    .pipe(gulp.dest('./dist/img/'))
    .pipe(browserSync.stream());
});


// Combine svg files into one with <symbol> elements.
gulp.task('build-svg', function() {
    return gulp.src(['./src/img/**/*.svg', '!./src/img/flags/tmp/**/*.svg'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(svgmin(function(file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        };
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(gulp.dest('./dist/img/'));
});


// Copy Fonts to dist folder
gulp.task('copy-font-files', function() {
    return gulp.src(['./src/fonts/*'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('./dist/fonts/'))
    .pipe(browserSync.stream());
});

// Copy Video to dist folder
gulp.task('copy-video-files', function() {
    return gulp.src(['./src/video/*'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('./dist/video/'))
    .pipe(browserSync.stream());
});

// Copy Favicon to dist folder
gulp.task('copy-favicon-folder', function() {
    return gulp.src(['./src/img/favicon/*'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('./dist/img/favicon/'))
    .pipe(browserSync.stream());
});

// Copy SVG's to dist folder
gulp.task('copy-svg-files', function() {
    return gulp.src(['./src/img/**/*.svg'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(gulp.dest('./dist/img/'))
    .pipe(browserSync.stream());
});


// Static Server + watch files
gulp.task('run-server', function() {
    browserSync.init({
        server: "./dist",
        index: "/html/index.html",
        notify: false,
        open: true,
        reloadDebounce: 300,
        port: 8080
    });

    gulp.watch('./src/js/**/*.js', ['build-js']);
    gulp.watch('./src/css/**/*.scss', ['build-styles']);
    gulp.watch('./src/**/*.html', ['build-content']);
    gulp.watch('./src/**/*.inc', ['build-include']);
    gulp.watch('src/img/**/*.+(png|gif|jpg|svg)', ['build-img', 'build-svg', 'copy-svg-files']);

    gulp.watch("./dist/*.html").on('change', browserSync.reload);
});

// Run develop
gulp.task('default', function(callback) {
    runSequence(
        ['copy-font-files', 'copy-video-files', 'copy-favicon-folder', 'copy-svg-files'],
        ['build-img', 'build-svg'],
        ['build-js', 'build-styles'],
        ['build-content', 'build-include'],
        'run-server',
    callback);
});

// Run build
gulp.task('build', function(callback) {
    runSequence(
        'clean-dist',
        ['copy-font-files', 'copy-favicon-folder', 'copy-svg-files'],
        ['build-img', 'build-svg'],
        ['build-js', 'build-styles'],
    callback);
});
