const { series, src, dest, watch, parallel } = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require ("gulp-webp");
const concat = require ('gulp-concat');


//funcion que compila sass//

function css( ) {
    return src(paths.scss)
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe( dest('./build/css') );
    
}

function minificarcss() {
    return src(paths.scss)
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe( dest('./build/css') );

}

function javascript () {
    return src (paths.js)
    .pipe (concat('bundle.js'))
    .pipe (dest('./build/js'))

}



function imagenes () {
    return src(paths.imagenes)
    .pipe(imagemin( ) )
    .pipe(dest('./build/img'))
    .pipe(notify ({message: 'imagen Minificada'}));
}





 function versionWebp () {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('./build/img'))
        .pipe(notify ({message: 'Version webp Lista'}));
}

function watchArchivos ( ) {

    watch(paths.scss, css);
    watch (paths.js, javascript);

}

const paths = {
imagenes: 'img/**/*',
scss: 'src/scss/**/*.scss',
js: 'src/js/**/*.js'
}

exports.css = css;

exports.minificarcss = minificarcss;

exports.watchArchivos = watchArchivos;

exports.imagenes = imagenes;

exports.default = series (css, imagenes, javascript, versionWebp, watchArchivos);

exports.versionWebp = versionWebp;