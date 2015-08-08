var pager = require('../../../../../index').pager;
//var mask = require('zippo-ui').mask;

function run() {
  pager.init({
    $el: $('#pager'),
    btnInPage: 10,
    itemInPage: 14,
    onTurn: function (curPage) {
      console.log(curPage);
    }
  });
  pager.setTotal(50 + Math.floor(Math.random() * 100));
  $('button').click(function () {
    var num = 50 + Math.floor(Math.random() * 100);
    pager.setTotal(num);
    console.log('当前item个数：', num);
  });
}

module.exports = {
  unitTest: run
}