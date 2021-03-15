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

