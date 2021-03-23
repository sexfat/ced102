// jquery
// import $ from 'jquery';
import Vue from 'vue';
// import './css/style.css';
// import './css/main.css';
// import './css/index.css';
import './sass/style.scss';

const callthings =(some) =>{
   return some + 'do something' 
}

console.log(callthings('bb'));


 new Vue({
    el : '#app',
    data : {
     message : 'hi Vue is ok'  
    }
 })


// $('body').css('background-color' , '#eee');