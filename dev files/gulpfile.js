const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-imagemin');
const jsMin = require('gulp-minify');
const GulpCleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const styles = () => {
  return src('src/css/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.pug')
    .pipe(pug())
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('src/img/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/images'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
  ])
    .pipe(image())
    .pipe(dest('dist/img'))
}

const jsFiles = () => {
  return src([
    'src/*.js'
  ])
    .pipe(jsMin())
    .pipe(dest('dist'))
}

const gulp = require('gulp');

const copyFonts = () => {
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
}

const copySvg = () => {
  return gulp.src('src/img/**/*.svg')
    .pipe(gulp.dest('dist/img'))
}

watch('src/**/*.html', htmlMinify);
watch('src/css/**/*.css', styles);
watch('src/img/**/*.svg', svgSprites);
watch('src/**/*.pug', htmlMinify);
watch('src/css/**/*.scss', styles);
watch('src/**/*.js', jsFiles);

exports.default = series(htmlMinify, styles, images, svgSprites, jsFiles, copyFonts, copySvg, watchFiles)
