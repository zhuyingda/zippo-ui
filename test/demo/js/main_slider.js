webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	
	var
	  
	  testModule = __webpack_require__(2);
	
	testModule.unitTest();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var slider = __webpack_require__(3).slider;
	
	
	function run() {
	  slider.init({
	    $el : $('#slider')
	  });
	}
	
	module.exports = {
	  unitTest: run
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author zhuyingda
	 * @type {{pager: {widget}, mask: {widget}, truncate: {util}, insert: {util}, clip: {util}}}
	 */
	
	module.exports = {
	  pager: __webpack_require__(4),
	  mask: __webpack_require__(5),
	  slider: __webpack_require__(6),
	  util: {
	    truncate: __webpack_require__(7),
	    insert: __webpack_require__(8),
	    clip: __webpack_require__(9)
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * @widget
	 * @author zyd
	 * @version 1.1.1
	 * pager   -   分页
	 * @author yingdazhu@icloud.com
	 * @git github.com/zhuyingda/zippo-ui
	 * @module commonJS
	 * @require pager.less
	 * @require pager.hbs
	 * @require jquery
	 */
	
	//require('./pager.less');
	
	var
	  /**
	   * @desc 初始化容器dom元素
	   */
	  //base = require('./pager_container.hbs'),
	  base = function(){
	    var str = '<div class="page-box clearfix"><div class="page-btn btn-style prev" style="float: left;">上一页</div><div class="page-wrap" style="float: left;"></div><div class="page-btn btn-style next" style="float: left;">下一页</div></div>';
	    return str;
	  },
	  /**
	   * @desc 当前所在页（从1开始）
	   */
	  curPage = 1,
	
	  /**
	   * @desc 每页显示评论数
	   */
	  itemInPage,
	
	  /**
	   * @desc 每页显示的翻页按钮数
	   */
	  btnInPage,
	
	  /**
	   * @desc 评论总条数
	   */
	  total = 0;
	
	/**
	 * @desc 获取当前页
	 */
	function getCurPage() {
	  return curPage;
	}
	
	/**
	 * @desc 设置总条数
	 */
	function setTotal(n) {
	  total = n;
	  core(curPage);
	}
	
	/**
	 * @desc 排列第pageNum页的按钮列表
	 * @var begin 当前页从第begin页开始
	 * @var end 当前页的最后一个按钮的页数
	 * @var endPageNum 总页数
	 * @var pagerContainer 组件容器
	 */
	function core(pageNum) {
	  var
	    begin,
	    end,
	    endPageNum = Math.ceil(total / itemInPage),
	    pagerContainer = $('.page-wrap');
	
	  begin = beginCal(pageNum, btnInPage, endPageNum);
	  end = endCal(begin, btnInPage, endPageNum);
	
	  pagerContainer.empty();
	  for (var i = begin; i <= end; i++) {
	    pagerContainer.append('<div class="page-item" style="float: left;cursor: pointer;">' + i + '</div>');
	  }
	  for (i = 0; i < $('.page-item').length; i++) {
	    if (pageNum == $('.page-item').eq(i).html()) {
	      $('.page-item').eq(i).addClass('btn-cur');
	    }
	  }
	
	  edgeCheck(pageNum, endPageNum);
	  curPage = pageNum;
	}
	
	/**
	 * @desc 计算当前页翻页按钮列表的起始位
	 */
	function beginCal(pageNum, btns, endPageNum) {
	  var mid = Math.round(btns / 2),
	    rest = Math.abs(endPageNum - pageNum);
	  if (pageNum <= mid) {
	    return 1;
	  } else if (pageNum > mid && rest >= mid) {
	    return pageNum - mid + 1;
	  } else if (rest < mid) {
	    if (endPageNum > btns) {
	      return endPageNum - (btns-1);
	    } else {
	      return 1;
	    }
	  }
	}
	
	/**
	 * @desc 计算当前页翻页按钮列表的起末位
	 */
	function endCal(begin, btns, endPageNum) {
	  if (btns <= endPageNum) {
	    return btns + begin - 1;
	  } else {
	    return endPageNum;
	  }
	}
	
	/**
	 * @desc 按钮样式边界处理
	 */
	function edgeCheck(pageNum, endPageNum) {
	  if (pageNum == 1) {
	    $('.page-box').addClass('in-first-page').removeClass('in-last-page');
	  } else if (pageNum == endPageNum) {
	    $('.page-box').addClass('in-last-page').removeClass('in-first-page');
	  } else {
	    $('.page-box').removeClass('in-first-page in-last-page');
	  }
	}
	
	/**
	 * @desc 翻页回调
	 */
	function onTurn(cb) {
	  $('.next').click(function () {
	    if (!$('.page-box').hasClass('in-last-page')) {
	      core(++curPage);
	      cb(curPage);
	    }
	  });
	  $('.prev').click(function () {
	    if (!$('.page-box').hasClass('in-first-page')) {
	      core(--curPage);
	      cb(curPage);
	    }
	  });
	  $('.page-wrap').on('click', '.page-item', function () {
	    core($(this).html());
	    cb($(this).html());
	  });
	}
	
	/**
	 * @desc 组件初始化
	 */
	function init(opts) {
	  var cont = base();
	  opts.$el.html(cont);
	  btnInPage = opts.btnInPage || 10;
	  itemInPage = opts.itemInPage || 10;
	  $('.page-item').click(function () {
	    $(this).addClass('btn-cur').siblings().removeClass('btn-cur');
	  });
	  onTurn(opts.onTurn || function () {
	      console.log('未绑定翻页回调')
	    });
	}
	
	module.exports = {
	  getCurPage: getCurPage,
	  setTotal: setTotal,
	  init: init
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * @widget
	 * @author zyd
	 * @version 1.1.1
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
	  container = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./container.hbs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
	
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * @util
	 * @author zyd
	 * @version 1.0
	 * truncate   -   字长限制器
	 * @author yingdazhu@icloud.com
	 * @git github.com/zhuyingda/zippo
	 * @module commonJS
	 * @desc 根据配置识别中英文，按长度截取字符串，兼容ie6
	 * @param {string} str 待切割字符
	 * @param {number} len 长度限制，以英文或半角符号为1个单位长度，中文占2个
	 */
	
	function index(str, len) {
	  str = isStr(str);
	  var weight = 0,
	    tmp = '',
	    i=0;
	  while(weight <= len && i < str.length){
	    tmp += str.charAt(i);
	    if(isZh(str.charAt(i))){
	      weight += 2;
	    }else{
	      weight += 1;
	    }
	    i++;
	  }
	  if(tmp.length < str.length){
	    tmp += '…';
	  }
	  return tmp;
	}
	
	function isStr(str){
	  if(str == undefined || str == '' || str == null || !str.toString()){
	    str = '-';
	  }else{
	    str = str.toString();
	  }
	  return str;
	}
	
	function isZh(token) {
	  if(token.charCodeAt(0) > 128){
	    return true;
	  }else{
	    return false;
	  }
	}
	
	module.exports = {
	  exec: index
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * @util
	 * insert2cursor   -   input/textarea内容插入
	 * @module commonJS
	 * @desc 将字符串插入到input/textarea光标所在位置，兼容ie6
	 * @param {elem} field 原生input/textarea标签元素对象
	 * @param {string} val 需要插入的内容
	 */
	
	function index(field, val) {
	  if (document.selection) {
	    field.focus();
	    sel.text = val;
	    sel.select();
	  } else if (field.selectionStart || field.selectionStart == '0') {
	    var startPos = field.selectionStart;
	    var endPos = field.selectionEnd;
	    var restoreTop = field.scrollTop;
	    field.value = field.value.substring(0, startPos) + val + field.value.substring(endPos, field.value.length);
	    if (restoreTop > 0) {
	      field.scrollTop = restoreTop;
	    }
	    field.focus();
	    field.selectionStart = startPos + val.length;
	    field.selectionEnd = startPos + val.length;
	  } else {
	    field.value += val;
	    field.focus();
	  }
	}
	
	module.exports = {
	  exec: index
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * @util
	 * copy2clipboard   -   将字符串复制到剪贴板
	 * @module commonJS
	 * @desc 将字符串复制到系统剪贴板，兼容ie6，webkit、FF浏览器需要安装插件
	 * @param {string} maintext 需要复制的字符串
	 */
	
	function copyToClipboard(maintext) {
	  if (window.clipboardData) {
	    window.clipboardData.setData("Text", maintext);
	  } else if (window.netscape) {
	    try {
	      netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	    } catch (e) {
	      alert("该浏览器不支持一键复制！\n请手工复制文本框链接地址～");
	    }
	
	    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	    if (!clip) return;
	    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	    if (!trans) return;
	    trans.addDataFlavor('text/unicode');
	    var str = new Object();
	    var len = new Object();
	    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	    var copytext = maintext;
	    str.data = copytext;
	    trans.setTransferData("text/unicode", str, copytext.length * 2);
	    var clipid = Components.interfaces.nsIClipboard;
	    if (!clip) return false;
	    clip.setData(trans, null, clipid.kGlobalClipboard);
	    alert("以下内容已经复制到剪贴板\n\n" + maintext);
	  }
	  alert("该浏览器不支持一键复制！\n请手工复制文本框链接地址～");
	}
	
	module.exports = {
	  exec: copyToClipboard
	}

/***/ }
]);
//# sourceMappingURL=main_slider.js.map