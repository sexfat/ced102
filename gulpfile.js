const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');




//======  1 . console.log
function defaultTask(cb) {
    //任務
    console.log('hello gulp4');
    cb();
}
//輸出任務
exports.do = defaultTask;


// ====== 2. 任務流程

// 任務a
function funcA(cb) {
    //任務a
    console.log('任務a');
    cb();
}

// 任務b
function funcB(cb) {
    //任務b
    console.log('任務b');
    cb();
}

exports.doA = series(funcA, funcB); // 任務串連
exports.doB = parallel(funcA, funcB); // 任務並行


// ========== 3. 打包 src / dest

// js
function movefile() {
    return src('js/main.js').pipe(dest('output'));  // src -> dest
}
// css
function movefile_css() {
    return src('css/style.css').pipe(dest('output/css'));  // src -> dest
}

// exports.cp = movefile; // 輸出任務


// ========== 4. watch  監看 

function watchTask() {
    watch('js/main.js', movefile);  // 當main.js 有變動 -> 執行movefile任務 
    watch('css/style.css', movefile_css);  // css 變動 
}

exports.dowatch = watchTask; //輸出任務




//====== 5.壓縮 js
//  套件引入
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');



function uglify_js() {
    return src('js/main.js')
        .pipe(uglify()) // 去執行uglify函式
        .pipe(rename({
            //extname : '.min.js' //修改副檔名
            basename: 'scripts' // 改檔名
        }))
        .pipe(dest('output/mini'));
}

// exports.js = uglify_js;

// ==== 6. css 壓縮

const cleanCSS = require('gulp-clean-css'); // 1. 

function mini_css() {
    return src('css/style.css')
        .pipe(cleanCSS({ compatibility: 'ie10' })) // 
        .pipe(rename({
            extname: '.min.css' //修改副檔名
            //basename : 'scripts' // 改檔名
        }))
        .pipe(dest('output/css'))
}

// exports.css = mini_css; // 

function watchall() {
    watch(['css/style.css', 'js/main.js'], parallel(mini_css, uglify_js)) // css js 同時監看
}
// 
exports.doall = watchall;



//合併程式碼
const concat = require('gulp-concat');

function cssconcat() {
    return src(['css/*.css', '!css/style.css'])
        .pipe(concat('all.css')) //合併
        .pipe(cleanCSS({ compatibility: 'ie10' })) // 壓縮
        .pipe(dest('output/css'))
}

exports.concat = cssconcat;


// sass 編譯 與 sourcemap 使用

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

function styleSass() {
    return src('dev/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded' // nested 巢狀 | expanded  | compressed 壓縮
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('css'))
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

exports.html = htmlTemplate;


//套件清除舊檔案

const clean = require('gulp-clean');


function clearfile() {
    return src('css', { read: false, allowEmpty: true })  // allowEmpty : true 允許空的資料結構
        .pipe(clean({ force: true }));  // {force: true} 強制刪除
}

// exports.clear = clearfile;

exports.pcss = series(clearfile, styleSass)  //先刪除舊檔案，再進行打包 


// 壓縮圖片 https://www.npmjs.com/package/gulp-imagemin

const imagemin = require('gulp-imagemin');

function imgs() {
    return src('images/*.*')
        .pipe(rename({
            prefix: "bonjour-", // 檔名前
            // suffix: "-min" // 檔名後
            // extname : '.min.css' //修改副檔名
            //basename : 'scripts' // 改檔名
        }))
        .pipe(imagemin())
        .pipe(dest('images/mini/'))
}

exports.minimg = imgs

function clearfile_img() {
    return src('images/mini', { read: false, allowEmpty: true })  // allowEmpty : true 允許空的資料結構
        .pipe(clean({ force: true }));  // {force: true} 強制刪除
}

exports.clearImg = series(clearfile_img, imgs) // 先執行刪除舊圖片  -> 壓縮圖片

// ======

// css prefixer 

const autoprefixer = require('gulp-autoprefixer');


function autoprefix() {
    return src('css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            //prefix: "bonjour-", // 檔名前
             suffix: "-prefix" // 檔名後
            // extname : '.min.css' //修改副檔名
            //basename : 'scripts' // 改檔名
        }))
        .pipe(dest('css'))
} 

exports.prefix = autoprefix

// 瀏覽器同步

const browsersync = require('browser-sync')
const reload = browsersync.reload;


function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./",  //根目錄
            index: "index.html"  // 打開頁面
        },
        port: 3000
    });
    // 監看檔案 -> reload broswer
    watch(['dev/sass/*.scss', 'dev/sass/**/*.scss'], series(clearfile, styleSass , autoprefix)).on('change', reload)
    watch(['dev/*.html', 'dev/**/*.html'], htmlTemplate).on('change', reload)
}


exports.browser = browserSync

































































