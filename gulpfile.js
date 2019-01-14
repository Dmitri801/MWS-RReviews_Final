const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");

// Compile Sass
gulp.task("sass", () => {
  return gulp
    .src(["src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream({ match: "**/*.css" }));
});

// Watch and Serve
gulp.task("serve", ["sass"], () => {
  browserSync.init({
    injectChanges: true,
    server: "./src"
  });

  gulp.watch(["src/scss/*.scss"], ["sass"]).on("change", browserSync.reload);
  gulp.watch(["src/*.html"]).on("change", browserSync.reload);
  gulp.watch(["src/*.js", "src/sw/*.js"]).on("change", browserSync.reload);
});

// Default task
gulp.task("default", ["serve"]);
