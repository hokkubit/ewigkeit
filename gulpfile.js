const { src, dest, watch, parallel, series } = require('gulp')

const babel = require('gulp-babel');
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer')
const notify = require("gulp-notify")
const imagemin = require('gulp-imagemin')
const del = require('del')


const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    }
}

function clean() {
    return del('dist')
}

function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest))
}

function styles() {
    return src(['node_modules/normalize.css/normalize.css',
          paths.styles.src])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', notify.onError()))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
            'node_modules/jquery/dist/jquery.min.js',
            'src/js/main.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ["@babel/preset-env"]}))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function images() {
    return src(paths.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest(paths.images.dest))
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}

function watching() {
    watch([paths.styles.src], styles)
    watch([paths.scripts.src], scripts)
    watch([paths.html.src], html).on('change', browserSync.reload)
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;
exports.clean = clean;
exports.html = html;
exports.redist = series(clean, images, html, styles, scripts)

// gulp start default
exports.default = parallel(browsersync, watching);