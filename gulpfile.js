"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var atImport = require("postcss-import");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task("clean", function () {
    return del("docs");
});

gulp.task("copy", function () {
    return gulp.src([
        "*.html",
        "fonts/**/*.{woff,woff2}",
        "img/**",
        "js/**"
    ], {
        base: "."
    })
        .pipe(gulp.dest("docs"));
});

gulp.task("style", function () {
    gulp.src("style.css")
        .pipe(plumber())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(postcss([
            atImport()
        ]))
        .pipe(gulp.dest("docs"))
        .pipe(server.stream());
});

// gulp.task("style", function() {
//     gulp.src("style.css")
//         .pipe(plumber())
//         .pipe(postcss([
//             autoprefixer()
//         ]))
//         .pipe(server.stream());
// });

gulp.task("sprite", function () {
    return gulp.src("img/icon-*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("docs/img"));
});

// gulp.task("sprite", function () {
//     return gulp.src("img/icon-*.svg")
//         .pipe(svgstore({
//             inlineSvg: true
//         }))
//         .pipe(rename("sprite.svg"))
//         .pipe(gulp.dest("img"));
// });

gulp.task("images", function () {
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("img"));

});


gulp.task("serve", function () {
    server.init({
        server: "docs/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("css/**/*.less", ["style"]);
    gulp.watch("*.html", ["html"]);
});

gulp.task("serve", ["style"], function() {
    server.init({
        server: ".",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("css/**/*.css", ["style"]);
    gulp.watch("*.html").on("change", server.reload);
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('js/*.js'),
            uglify(),
            gulp.dest('docs/js')
        ],
        cb
    );
});

gulp.task("docs", function (done) {
    run(
        "clean",
        "copy",
        "style",
        "sprite",
        "compress",
        done
    );
});