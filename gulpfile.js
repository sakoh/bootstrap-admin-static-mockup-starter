const gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    minifyCss = require("gulp-minify-css"),
    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant"),
    browserSync = require("browser-sync").create(),
    nunjucks = require("gulp-nunjucks"),
    paths = require("./paths.json"),
    data = require("./data.json");

gulp.task("watch", ["compile"], () => {
    const reload = browserSync.reload;

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.source.sass, ["sass"]);
    gulp.watch("./handlebars/**/*.hbs",["handlebars", reload]);
    gulp.watch("js/*.js",["scripts:watch"]);
    gulp.watch("pages/*.html").on("change", reload);
});

gulp.task("sass", () => (
    gulp.src(paths.source.sass)
        .pipe(sass())
        .pipe(gulp.dest(paths.dest.styles))
        .pipe(browserSync.stream())
));

gulp.task("sass:minify", ["sass"], () => (
    gulp.src(paths.dest + "/sb-admin-2.css")
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.dest.styles))
));

gulp.task("fonts", () => (
    gulp.src(paths.source.fonts)
        .pipe(gulp.dest(paths.dest.fonts))
));

gulp.task("images", () => (
    gulp.src(paths.source.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.dest.images))
));

gulp.task("scripts", () => (
    gulp.src(paths.source.scripts)
        .pipe(concat("admin.js"))
        .pipe(gulp.dest(paths.dest.scripts))
));

gulp.task("scripts:watch",["scripts"], browserSync.reload);

gulp.task("scripts:uglify",["scripts"], () => (
    gulp.src(paths.dest.scripts + "/admin.js")
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest.scripts))
));

gulp.task("templates", () =>

    gulp.src('./templates/index.html')
		.pipe(nunjucks.compile(data))
		.pipe(gulp.dest('.'))
);

gulp.task("compile",["sass", "templates", "fonts","images","scripts"]);

gulp.task("compile:dist",["sass:minify", "templates", "fonts","images","scripts:uglify"]);
