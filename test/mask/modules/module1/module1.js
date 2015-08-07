require('./module1.less');

var mask = require('zippo-ui').mask;
var tpl = require('./dialog.handlebars');

function index(){
  var m;
  $('#btn_show').click(function () {
    m = mask.showMask(tpl(),{animation:'fade'});
  });
  $('#btn_shake').click(function () {
    m.shake();
  });
  $('#btn_close').click(function () {
    m.close();
  })
}

module.exports = {
  md1: index
}