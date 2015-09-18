/**
 * @widget
 * @author zyd
 * @version 1.1.1
 * slider   -   轮播图
 * @author yingdazhu@icloud.com
 * @git github.com/zhuyingda/zippo-ui
 * @module commonJS
 * @require jquery
 */

var

  /**
   * @desc 渲染dom
   */
  container = require('./container.hbs'),

  /**
   * @desc 动画锁
   */
  lock = false,

  /**
   * @desc 配置
   */
  config = {
    $el: {},
    autoPlay: true,
    period: 5000,
    type: 'slide',
    clickable: true,
    api: 'event'
  },

  /**
   * @desc 资源
   */
  res = [],

  /**
   * @desc 循环器工厂
   */
  loopFactory = function (cb) {
    var inter = null,
      curItem = 0;
    return {
      play: function () {
        if (!res.length) {
          return;
        }
        inter = setInterval(function () {
          curItem = curItem == res.length - 1 ? 0 : curItem + 1;
          cb(curItem);
        }, config.period);
      },
      stop: function () {
        clearInterval(inter);
      }
    }
  };

function init(options){
  var options = prefix(options);
  config = $.extend(config,options);
  config.$el.html(container());
  //$.map(res, function (item, key) {
  //
  //})
}

function prefix(options){

}

module.exports = {
  init: init
}