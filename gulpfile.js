const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

//====== 5.壓縮 js
//  套件引入
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');





// ==== 6. css 壓縮

// const cleanCSS = require('gulp-clean-css'); // 1. 

// function mini_css() {
//     return src('css/style.css')
//     .pipe(cleanCSS({compatibility: 'ie10'})) // 
//     .pipe(rename({
//         extname : '.min.css' //修改副檔名
//         //basename : 'scripts' // 改檔名
//     }))
//     .pipe(dest('output/css'))
// }

// exports.css = mini_css; // 



 // js
 function uglify_js() {
    return src('dev/js/*.js')
    .pipe(uglify()) // 去執行uglify函式
    .pipe(rename({
        //extname : '.min.js' //修改副檔名
        basename : 'scripts' // 改檔名
    }))
    .pipe(dest('./js'));
}





// sass 編譯 與 sourcemap 使用

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

function styleSass() {
     return src('dev/sass/*.scss')
     .pipe(sourcemaps.init())
     .pipe(sass({
         outputStyle : 'expanded' // nested 巢狀 | expanded  | compressed 壓縮
     }).on('error', sass.logError))
     .pipe(sourcemaps.write())
     .pipe(dest('./css'))
}

// exports.style = styleSass;

// html template

const fileinclude = require('gulp-file-include');

function htmlTemplate() {
    return src('dev/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(dest('./'))
}

// exports.html = htmlTemplate;




 exports.default = function watchall(){
   watch('dev/sass/*.scss' , styleSass)
   watch('dev/js/*.js' , uglify_js)
   watch('dev/*.html' , htmlTemplate)
}

































