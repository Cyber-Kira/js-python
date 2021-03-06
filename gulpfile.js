const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync");
const cssnext = require("postcss-cssnext");
const shortcss = require("postcss-short");

const dist = "./dist";

gulp.task("copy-sitemap", () => {
  return gulp
    .src("./src/sitemap.xml")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("copy-lessons", () => {
  return gulp
    .src("./src/pages/lessons/*.html")
    .pipe(gulp.dest(dist + "/pages/lessons/"))
    .pipe(browsersync.stream());
});

gulp.task("copy-labs", () => {
  return gulp
    .src("./src/pages/labs/*.html")
    .pipe(gulp.dest(dist + "/pages/labs/"))
    .pipe(browsersync.stream());
});

gulp.task("copy-pract", () => {
  return gulp
    .src("./src/pages/practice/*.html")
    .pipe(gulp.dest(dist + "/pages/practice/"))
    .pipe(browsersync.stream());
});

gulp.task("copy-quiz", () => {
  return gulp
    .src("./src/pages/quiz/*.html")
    .pipe(gulp.dest(dist + "/pages/quiz/"))
    .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist + "/js"))
    .pipe(browsersync.stream());
});

gulp.task("build-css", () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(dist + "/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  gulp.src("./src/icons/**/*.*").pipe(gulp.dest(dist + "/icons"));

  return gulp
    .src("./src/img/**/*.*")
    .pipe(gulp.dest(dist + "/img"))
    .pipe(browsersync.stream());
});

gulp.task("watch", () => {
  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/pages/lessons/*.html", gulp.parallel("copy-lessons"));
  gulp.watch("./src/pages/labs/*.html", gulp.parallel("copy-labs"));
  gulp.watch("./src/pages/practice/*.html", gulp.parallel("copy-pract"));
  gulp.watch("./src/pages/quiz/*.html", gulp.parallel("copy-quiz"));
  gulp.watch("./src/icons/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/img/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/css/*.css", gulp.parallel("build-css"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task(
  "build",
  gulp.parallel(
    "copy-html",
    "copy-assets",
    "build-css",
    "build-js",
    "copy-lessons",
    "copy-labs",
    "copy-pract",
    "copy-quiz"
  )
);

gulp.task("prod", () => {
  gulp.src("./src/index.html").pipe(gulp.dest(dist));
  gulp.src("./src/sitemap.xml").pipe(gulp.dest(dist));
  gulp.src("./src/img/**/*.*").pipe(gulp.dest(dist + "/img"));
  gulp.src("./src/icons/**/*.*").pipe(gulp.dest(dist + "/icons"));

  gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "script.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist + "/js"));

  var plugins = [
    shortcss,
    cssnext,
    autoprefixer({ overrideBrowserslist: ["defaults"], cascade: false }),
  ];

  return gulp
    .src("./src/css/style.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest(dist + "/css"));
});

gulp.task("default", gulp.parallel("watch", "build"));
