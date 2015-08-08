require('./module1.less');

var mask = require('../../../../../index').mask;
//var mask = require('zippo-ui').mask;
var tpl = require('./dialog.handlebars');

function index(){
  var maskStack = [];
  $('#btn_show').click(function () {
    var m = mask.showMask(tpl(),{animation:'fade'});
    maskStack.push(m);
    console.log(mask.maskList());
  });
  $('#btn_shake').click(function () {
    var m = maskStack.pop();
    m.shake();
    maskStack.push(m);
  });
  $('#btn_close').click(function () {
    var m = maskStack.pop();
    m.close();
  });
}

module.exports = {
  md1: index
}