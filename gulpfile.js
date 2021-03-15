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
function funcA(cb){
    //任務a
    console.log('任務a');
    cb();
}

// 任務b
function funcB(cb){
    //任務b
    console.log('任務b');
    cb();
}

exports.doA =  series(funcA , funcB); // 任務串連
exports.doB =  parallel(funcA , funcB); // 任務並行


// ========== 3. 打包 src / dest

// js
function movefile() {
   return src('js/main.js').pipe(dest('output'));  // src -> dest
} 
// css
function movefile_css(){
    return src('css/style.css').pipe(dest('output/css'));  // src -> dest
 } 

// exports.cp = movefile; // 輸出任務


// ========== 4. watch  監看 

function watchTask(){
   watch('js/main.js' , movefile);  // 當main.js 有變動 -> 執行movefile任務 
   watch('css/style.css' , movefile_css);  // css 變動 
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
        basename : 'scripts' // 改檔名
    }))
    .pipe(dest('output/mini'));
}

// exports.js = uglify_js;

// ==== 6. css 壓縮

const cleanCSS = require('gulp-clean-css'); // 1. 

function mini_css() {
    return src('css/style.css')
    .pipe(cleanCSS({compatibility: 'ie10'})) // 
    .pipe(rename({
        extname : '.min.css' //修改副檔名
        //basename : 'scripts' // 改檔名
    }))
    .pipe(dest('output/css'))
}

// exports.css = mini_css; // 

function watchall(){
   watch(['css/style.css ','js/main.js'] , parallel(mini_css ,uglify_js)) // css js 同時監看
}

exports.doall = watchall;











