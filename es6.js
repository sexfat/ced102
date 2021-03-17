// jquery
// import $ from 'jquery';
import Vue from 'vue';

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