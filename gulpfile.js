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










