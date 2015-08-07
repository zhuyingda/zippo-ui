webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	
	var
	  
	  md1 = __webpack_require__(2),
	
	  
	  md2 = __webpack_require__(17);
	
	md1.md1();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	
	var mask = __webpack_require__(3).mask;
	var tpl = __webpack_require__(16);
	
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author zhuyingda
	 * @type {{pager: {widget}, mask: {widget}, truncate: {util}}}
	 */
	
	module.exports = {
	  pager: __webpack_require__(4),
	  mask: __webpack_require__(14),
	  truncate: __webpack_require__(15)
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @widget
	 * @author zyd
	 * @version 1.1
	 * pager   -   分页
	 * @author yingdazhu@icloud.com
	 * @git github.com/zhuyingda/zippo
	 * @module commonJS
	 * @require pager.less
	 * @require pager.handlebars
	 * @require jquery
	 */
	
	//require('./pager.less');
	
	var
	  /**
	   * @desc 初始化容器dom元素
	   */
	  base = __webpack_require__(5),
	
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
	  renderPager(curPage);
	}
	
	/**
	 * @desc 排列第pageNum页的按钮列表
	 * @var begin 当前页从第begin页开始
	 * @var end 当前页的最后一个按钮的页数
	 * @var pageLen 总页数
	 * @var pagerContainer 组件容器
	 */
	function renderPager(pageNum) {
	  var
	    begin,
	    end,
	    pageLen = Math.ceil(total / itemInPage) + 1,
	    pagerContainer = $('.page-wrap');
	
	  begin = beginCal(pageNum, btnInPage, pageLen);
	  end = endCal(begin, btnInPage, pageLen);
	
	  pagerContainer.empty();
	  for (var i = begin; i < end; i++) {
	    pagerContainer.append('<div class="page-item" style="float: left;cursor: pointer;">' + i + '</div>');
	  }
	  for (i = 0; i < $('.page-item').length; i++) {
	    if (pageNum == $('.page-item').eq(i).html()) {
	      $('.page-item').eq(i).addClass('btn-cur');
	    }
	  }
	
	  edgeCheck(pageNum, pageLen);
	  curPage = pageNum;
	}
	
	/**
	 * @desc 计算当前页翻页按钮列表的起始位和末位
	 */
	function beginCal(pageNum, btns, pageLen) {
	  if (pageNum <= Math.round(btns / 2)) {
	    return 1;
	  } else if (pageNum > Math.round(btns / 2) && Math.abs((pageLen - 1) - pageNum) >= Math.round(btns / 2)) {
	    return pageNum - Math.round(btns / 2) + 1;
	  } else if (Math.abs((pageLen - 1) - pageNum) < Math.round(btns / 2)) {
	    if (pageLen > btns) {
	      return pageLen - btns;
	    } else {
	      return 1;
	    }
	  }
	}
	
	function endCal(begin, btns, pageLen) {
	  if (btns <= pageLen) {
	    return btns + begin;
	  } else {
	    return pageLen + begin - 1;
	  }
	}
	
	/**
	 * @desc 按钮样式边界处理
	 */
	function edgeCheck(pageNum, pageLen) {
	  if (pageNum == 1) {
	    $('.page-box').addClass('in-first-page').removeClass('in-last-page');
	  } else if (pageNum == pageLen - 1) {
	    $('.page-box').addClass('in-last-page').removeClass('in-first-page');
	  } else {
	    $('.page-box').removeClass('in-first-page in-last-page');
	  }
	}
	
	/**
	 * @desc 翻页回调
	 */
	function onTurn(func) {
	  $('.next').click(function () {
	    if (!$('.page-box').hasClass('in-last-page')) {
	      renderPager(++curPage);
	      func(curPage);
	    }
	  });
	  $('.prev').click(function () {
	    if (!$('.page-box').hasClass('in-first-page')) {
	      renderPager(--curPage);
	      func(curPage);
	    }
	  });
	  $('.page-wrap').on('click', '.page-item', function () {
	    renderPager($(this).html());
	    func($(this).html());
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
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<div class=\"page-box clearfix\">\r\n    <div class=\"page-btn btn-style prev\" style=\"float: left;\">上一页</div>\r\n    <div class=\"page-wrap\" style=\"float: left;\">\r\n\r\n    </div>\r\n    <div class=\"page-btn btn-style next\" style=\"float: left;\">下一页</div>\r\n</div>";
	},"useData":true});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(7)['default'];


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	exports.__esModule = true;
	
	var _import = __webpack_require__(8);
	
	var base = _interopRequireWildcard(_import);
	
	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	
	var _SafeString = __webpack_require__(11);
	
	var _SafeString2 = _interopRequireWildcard(_SafeString);
	
	var _Exception = __webpack_require__(10);
	
	var _Exception2 = _interopRequireWildcard(_Exception);
	
	var _import2 = __webpack_require__(9);
	
	var Utils = _interopRequireWildcard(_import2);
	
	var _import3 = __webpack_require__(12);
	
	var runtime = _interopRequireWildcard(_import3);
	
	var _noConflict = __webpack_require__(13);
	
	var _noConflict2 = _interopRequireWildcard(_noConflict);
	
	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();
	
	  Utils.extend(hb, base);
	  hb.SafeString = _SafeString2['default'];
	  hb.Exception = _Exception2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;
	
	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };
	
	  return hb;
	}
	
	var inst = create();
	inst.create = create;
	
	_noConflict2['default'](inst);
	
	inst['default'] = inst;
	
	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	exports.createFrame = createFrame;
	
	var _import = __webpack_require__(9);
	
	var Utils = _interopRequireWildcard(_import);
	
	var _Exception = __webpack_require__(10);
	
	var _Exception2 = _interopRequireWildcard(_Exception);
	
	var VERSION = '3.0.1';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 6;
	
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};
	
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';
	
	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	
	  registerDefaultHelpers(this);
	}
	
	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,
	
	  logger: logger,
	  log: log,
	
	  registerHelper: function registerHelper(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) {
	        throw new _Exception2['default']('Arg not supported with multiple helpers');
	      }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },
	
	  registerPartial: function registerPartial(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _Exception2['default']('Attempting to register a partial as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  }
	};
	
	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function () {
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _Exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;
	
	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }
	
	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }
	
	      return fn(context, options);
	    }
	  });
	
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _Exception2['default']('Must pass iterator to #each');
	    }
	
	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;
	
	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }
	
	    if (isFunction(context)) {
	      context = context.call(this);
	    }
	
	    if (options.data) {
	      data = createFrame(options.data);
	    }
	
	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;
	
	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }
	
	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: Utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }
	
	    if (context && typeof context === 'object') {
	      if (isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          execIteration(i, i, i === context.length - 1);
	        }
	      } else {
	        var priorKey = undefined;
	
	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }
	
	    if (i === 0) {
	      ret = inverse(this);
	    }
	
	    return ret;
	  });
	
	  instance.registerHelper('if', function (conditional, options) {
	    if (isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }
	
	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });
	
	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	
	  instance.registerHelper('with', function (context, options) {
	    if (isFunction(context)) {
	      context = context.call(this);
	    }
	
	    var fn = options.fn;
	
	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = { data: data };
	      }
	
	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });
	
	  instance.registerHelper('log', function (message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });
	
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	}
	
	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },
	
	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 1,
	
	  // Can be overridden in the host environment
	  log: function log(level, message) {
	    if (typeof console !== 'undefined' && logger.level <= level) {
	      var method = logger.methodMap[level];
	      (console[method] || console.log).call(console, message); // eslint-disable-line no-console
	    }
	  }
	};
	
	exports.logger = logger;
	var log = logger.log;
	
	exports.log = log;
	
	function createFrame(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	}
	
	/* [args, ]options */

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.extend = extend;
	
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  '\'': '&#x27;',
	  '`': '&#x60;'
	};
	
	var badChars = /[&<>"'`]/g,
	    possible = /[&<>"'`]/;
	
	function escapeChar(chr) {
	  return escape[chr];
	}
	
	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }
	
	  return obj;
	}
	
	var toString = Object.prototype.toString;
	
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/*eslint-disable func-style, no-var */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/*eslint-enable func-style, no-var */
	
	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};exports.isArray = isArray;
	
	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }
	
	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }
	
	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}
	
	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}
	
	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}
	
	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	
	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
	
	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;
	
	    message += ' - ' + line + ':' + column;
	  }
	
	  var tmp = Error.prototype.constructor.call(this, message);
	
	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }
	
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }
	
	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}
	
	Exception.prototype = new Error();
	
	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}
	
	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};
	
	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	
	// TODO: Remove this line and break up compilePartial
	
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;
	
	var _import = __webpack_require__(9);
	
	var Utils = _interopRequireWildcard(_import);
	
	var _Exception = __webpack_require__(10);
	
	var _Exception2 = _interopRequireWildcard(_Exception);
	
	var _COMPILER_REVISION$REVISION_CHANGES$createFrame = __webpack_require__(8);
	
	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _COMPILER_REVISION$REVISION_CHANGES$createFrame.COMPILER_REVISION;
	
	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[currentRevision],
	          compilerVersions = _COMPILER_REVISION$REVISION_CHANGES$createFrame.REVISION_CHANGES[compilerRevision];
	      throw new _Exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _Exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}
	
	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _Exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _Exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }
	
	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);
	
	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	    }
	
	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);
	
	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }
	
	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _Exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }
	
	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _Exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },
	
	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,
	
	    fn: function fn(i) {
	      return templateSpec[i];
	    },
	
	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },
	
	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;
	
	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }
	
	      return obj;
	    },
	
	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };
	
	  function ret(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];
	
	    var data = options.data;
	
	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }
	
	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, blockParams, depths);
	  }
	  ret.isTop = true;
	
	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);
	
	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };
	
	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _Exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _Exception2['default']('must pass parent depths');
	    }
	
	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}
	
	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments[1] === undefined ? {} : arguments[1];
	
	    return fn.call(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), depths && [context].concat(depths));
	  }
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}
	
	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    partial = options.partials[options.name];
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}
	
	function invokePartial(partial, context, options) {
	  options.partial = true;
	
	  if (partial === undefined) {
	    throw new _Exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}
	
	function noop() {
	  return '';
	}
	
	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _COMPILER_REVISION$REVISION_CHANGES$createFrame.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	exports.__esModule = true;
	/*global window */
	
	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	  };
	};
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * @widget
	 * @author zyd
	 * @version 1.0
	 * pager   -   弹层
	 * @author yingdazhu@icloud.com
	 * @git github.com/zhuyingda/zippo
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
	  manager = [];
	
	/**
	 * @desc 抖动
	 */
	function shake(id) {
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
	        }
	      });
	    });
	  }, freq + 20);
	}
	
	/**
	 * @desc 初始化
	 */
	function init(tpl, options, id) {
	  baseLevel++;
	  var html =
	    '<div id="mask_' + maskId + '" ' +
	    'style="display: none;' +
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
	  if (!options.top) {
	    $('#' + id).css({
	      'margin-top': $('.tpl_wrapper').height() / 2
	    });
	  }
	  if (!options.left) {
	    $('#' + id).css({
	      'margin-left': $('.tpl_wrapper').width() / 2
	    });
	  }
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
	    });
	  }
	  baseLevel--;
	  manager.pop();
	}
	
	/**
	 * @desc 展现一个弹层
	 */
	function showMask(tpl, options) {
	  maskId++;
	  var id = 'mask_' + maskId;
	  var opt = optionFilter(options);
	  init(tpl, opt, id);
	  var layerWrap = $('#' + id);
	  manager.push(layerWrap);
	  if (!opt.hasAnimation) {
	    layerWrap.show();
	  }
	  if (options.animation == 'fade') {
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(6);
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	    return "<div class=\"dialog\">\n    <h1>这是一个测试的弹层，请叫我标题</h1>\n    <p>这是测试弹层的内容</p>\n    <p>想看点好玩的特效吗，点抖个骚试试？</p>\n</div>";
	},"useData":true});

/***/ },
/* 17 */
/***/ function(module, exports) {

	
	
	function index(){
	  console.log('this is module2');
	}
	
	module.exports = {
	  md2: index
	}

/***/ }
]);
//# sourceMappingURL=main_mask.js.map