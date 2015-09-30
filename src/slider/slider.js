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
    api: 'event',
    width: 520,
    height: 280,
    transformTime: 500
  },

  res = [],

  /**
   * @desc 资源
   */
  fixConsole = require('../utils/console'),

  /**
   * @desc 循环器工厂
   */
  loopFactory = function (cb) {
    var inter = null,
      curItem = res.length - 1;
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
  var o = prefix(options);
  config = $.extend(config,o);

  res = o.res;
  $.map(res, function (i) {
    i.width= config.width;
    i.height= config.height;
  });
  config.$el.html(container({list: res,width: config.width,height: config.height}));

  $('.zp_slider_item').eq(0).show();

  var loop = new loopFactory(function (i) {
    transform(i);
  });
  loop.play();
}

function transform(i){
  if(lock){
    return;
  }
  if(config.type == 'slide'){
    _slide(i);
  }
}

function _slide(i){
  var iNext = i<res.length-1? i+1: 0;
  $('.zp_slider_item').eq(i).animate({left:'-'+config.width+'px'},config.transformTime);
  $('.zp_slider_item').eq(iNext).css({left:config.width+'px',display:'block'}).animate({left:'0px'},config.transformTime,'swing', function () {
    $('.zp_slider_item').eq(i).css({display:'none',left:'0px'});
    lock = true;
  });
}

function prefix(options){
  var o = options;
  if(!o.$el){
    console.warn('you should choose a $dom for building your slider.')
  }
  return o;
}

module.exports = {
  init: init
}
