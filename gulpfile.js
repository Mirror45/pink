const Key = "html/new";
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const terser = require("gulp-terser");
const htmlmin = require("gulp-htmlmin");
const { series, parallel, watch, src, dest } = require("gulp");

//  Css

const css = () => {
  return src(Key + "/src/sass/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(""))
    .pipe(dest(Key + "/src/css"))
    .pipe(browserSync.stream());
};

// Img

const img = () => {
  src(Key + "/src/img/**/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true }), // quality
        imagemin.optipng({ optimizationLevel: 3 }),
      ])
    )
    .pipe(webp({ quality: 90 }))
    .pipe(dest(Key + "/src/img"));
  return del(Key + "/src/img/**/*.{jpg,png}");
};

// Sprite

const svg = () => {
  return src(Key + "/src/img/**/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(dest(Key + "/src/icon"));
};

// Js

const js = () => {
  return src(Key + "/src/sass/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write(""))
    .pipe(dest(Key + "/src/js"));
};

// End

const end = () => {
  src(Key + "/*.html")
    .pipe(htmlmin())
    .pipe(dest(Key + "/dist"));
  src(Key + "/src/css/*.css")
    .pipe(cleanCSS())
    .pipe(dest(Key + "/dist/src/css"));
  src(Key + "/src/img/**/*.webp")
    .pipe(dest(Key + "/dist/src/img"));
  src(Key + "/src/icon/*.{png,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
      ])
    )
    .pipe(src(Key + "/src/icon/*.{ico,webmanifest}"))
    .pipe(dest(Key + "/dist/src/icon"));
  src(Key + "/src/js/*.js")
    .pipe(terser())
    .pipe(dest(Key + "/dist/src/js"));
  return src(Key + "/src/font/*.ttf")
    .pipe(dest(Key + "/dist/src/font"));
};

// Live

const live = () => {
  browserSync.init({
    server: { baseDir: Key },
    notify: false,
    online: true,
  });
  watch(Key + "/src/sass/**/*.scss", css);
  watch(Key + "/src/img/**/*.{jpg,png}", img).on("change", browserSync.reload);
  watch(Key + "/src/img/**/*.svg", svg).on("change", browserSync.reload);
  watch(Key + "/src/sass/**/*.js", js).on("change", browserSync.reload);
  watch(Key + "/*.html").on("change", browserSync.reload);
};

// Exports

exports.css = css;
exports.img = img;
exports.svg = svg;
exports.js = js;
exports.end = end;
exports.live = live;
exports.run = series(parallel(css, img, svg, js), () => {
  return del(Key + "/dist");
}, end);
exports.default = parallel(css, js, live);

