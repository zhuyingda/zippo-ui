/**
 * @widget
 * @author zyd
 * @version 1.0
 * pager   -   弹层
 * @author yingdazhu@icloud.com
 * @git github.com/zhuyingda/zippo-ui
 * @module commonJS
 * @require jquery
 */

var
  /**
   * @desc 弹层遮罩
   */
  maskLayer = '<div style="width:100%;height:100%;position:absolute;left:0;top:0;background:#000;opacity:0.4;filter:alpha(opacity=40);z-index:100;"><iframe src="about:blank" style="z-index:-1;width:100%;height:100%" allowtransparency="true" frameborder=0></iframe></div>',

  /**
   * @desc 当前弹层层级
   */
  baseLevel = 10000,

  /**
   * @desc 当前弹层层级
   */
  maskId = 0,

  /**
   * @desc 弹层管理器
   */
  manager = {};

/**
 * @desc 初始化
 */
function init(tpl, options, id) {
  baseLevel++;
  var html =
    '<div id="mask_' + maskId + '" ' +
    'style="visibility: hidden;' +
    'position: absolute; ' +
    'top: 0px;' +
    'left: 0px; ' +
    'z-index: ' + baseLevel + ';' +
    'width: 100%;' +
    'height: 100%;">' + maskLayer +
    '<div class="tpl_wrapper" style="position: absolute;' +
    'z-index: 200;' +
    'left: 50%;' +
    'top: 50%;">' + tpl.trim() +
    '</div></div>';
  $('body').append(html);
}

/**
 * @desc 抖动
 */
function shake(id) {
  if (manager[id].lock) {
    return;
  }
  manager[id].lock = true;
  var layer = $('#' + id + ' .tpl_wrapper');
  var curPos = parseInt(layer.css('left'));
  var freq = 50;
  var swing = 5;
  var t = setInterval(function () {
    curPos += swing;
    layer.animate({left: curPos + 'px'}, freq / 4, 'swing', function () {
      curPos -= swing * 2;
      layer.animate({left: curPos + 'px'}, freq / 2, 'swing', function () {
        curPos += swing;
        swing--;
        layer.animate({left: curPos + 'px'}, freq / 2);
        if (swing == 0) {
          clearInterval(t);
          manager[id].lock = false;
        }
      });
    });
  }, freq + 20);
}

/**
 * @desc 关闭
 */
function close(id, options) {
  var layerWrap = $('#' + id);
  if (!options.hasAnimation) {
    layerWrap.hide();
    layerWrap.remove();
  }
  if (options.animation == 'fade') {
    layerWrap.fadeOut(400, function () {
      layerWrap.remove();
      baseLevel--;
      if(baseLevel == 10000){
        $('body').css({overflow:'auto'}).removeAttr('style');
      }
    });
  }
  manager[id] = null;
  manager[id] = undefined;
}

/**
 * @desc 展现一个弹层
 */
function showMask(tpl, options) {
  maskId++;
  var id = 'mask_' + maskId;
  var opt = optionFilter(options);
  init(tpl, opt, id);
  prefix(opt, id);
  var layerWrap = $('#' + id);
  manager[id] = {
    $dom: layerWrap,
    lock: false
  };
  if (!opt.hasAnimation) {
    layerWrap.show();
  }
  if (opt.animation == 'fade') {
    layerWrap.fadeIn();
  }
  return {
    'shake': function () {
      shake(id);
    },
    'close': function () {
      close(id, options);
    }
  }
}

function prefix(options, id){
  if (!options.top) {
    $('#' + id + ' .tpl_wrapper').css({
      'margin-top': '-' + $('.tpl_wrapper').height() / 2 + 'px'
    });
  }
  if (!options.left) {
    $('#' + id + ' .tpl_wrapper').css({
      'margin-left': '-' + $('.tpl_wrapper').width() / 2 + 'px'
    });
  }
  $('#' + id).css({display:'none',visibility:'inherit'});
  $('body').css({overflow:'hidden'});
}

/**
 * @desc 过滤器
 */
function optionFilter(o) {
  var opt = {};
  opt.hasAnimation = o.animation ? true : false;
  return $.extend(o, opt);
}

function maskList() {
  return manager;
}

module.exports = {
  showMask: showMask,
  maskList: maskList
}