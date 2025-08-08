"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const minifyCss = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const error_handler = {
  errorHandler: notify.onError("Error: <%= error.message %>"),
};

function scss() {
  return gulp
    .src("./src/sass/style.scss", { sourcemaps: true })
    .pipe(plumber(error_handler))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer(["last 2 versions", "ie >= 10", "Android >= 4", "iOS >= 8"])
    )
    .pipe(gulp.dest("./public/css/", { sourcemaps: "./map/" }))
    .pipe(minifyCss())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./public/css/"));
}

function watcher() {
  gulp
    .watch("./src/sass/**/*.scss", gulp.parallel(scss))
    .on("change", function (event) {});
}

exports.default = watcher;
