/**
 * winbox(tpl, options).showMessage();
 *
 */
(function (window) {
  var win = window;
  var module_wm = (function ($) {
    var managers = [];
    var BASE_LEVEL = 10000;
    var TEMPLATE_MASK = '<div style="width:100%;height:100%;position:absolute;left:0;top:0;background:#000;opacity:0.4;filter:alpha(opacity=40);z-index:100;"><iframe src="about:blank" style="z-index:-1;width:100%;height:100%" allowtransparency="true" frameborder=0></iframe></div>';

    function WindowManager(tpl, settings) {
      settings = settings || {};
      this.tpl = $.parseHTML ? $.parseHTML(tpl.trim()) : tpl;
      this.prefix = settings.prefix || '_wm_',
        this.suffix = settings.suffix || '_message_',
        this.width = settings.width,
        this.height = settings.height,
        this.top = settings.top,
        this.left = settings.left,
        this.needmask = settings.needmask || true,
        this.events = $.extend({}, {
          'click|.cancel': 'close',
          'click|.confirm': 'close'
        }, settings.events);
      this.id = managers.push(this) - 1;
    }

    WindowManager.prototype = {
      showMessage: function () {
        this._open();
        return this;
      },

      close: function () {
        this._close();
        return false;
      },

      _open: function () {
        BASE_LEVEL++;
        var mask = this.getMask(this.needmask);
        this.dom = this._create(mask);
        this.bindEvents(this.events);
      },

      _close: function () {
        BASE_LEVEL--;
        var wm = managers[this.id];
        wm.dom.remove(); //todo hide this;
      },

      getMask: function (needMask) {
        if (needMask) {
          return TEMPLATE_MASK;
        }
        else {
          return '';
        }
      },

      bindEvents: function (events) {
        var wm = this, obj = wm.dom;

        $.each(events, function (k, v) {
          var event_selector = k.split('|');
          var e = event_selector[0];
          var s = event_selector[1];
          obj.on(e, s, function () {
            if ($.isFunction(v)) {
              v.apply(wm, arguments);
            }
            else {
              if ($.isFunction(wm[v])) {
                wm[v].apply(wm, arguments);
              }
              else {
//                                console.log('can not bind event');
              }
            }
          });
        });
      },

      _create: function (mask) {
        var wrapper = $('<div style="position:absolute;top:0;left:0">');
        var content = $(this.tpl);
        var _mask;
        if (!content.length) {
          content = $('<div>' + this.tpl + '</div>');
        }
        wrapper.css({
          position: 'absolute',
          zIndex: BASE_LEVEL,
          width: '100%',
          height: '100%'
        }).attr('id', this.prefix + BASE_LEVEL);

        content.css({
          position: 'absolute',
          zIndex: 200,
          width: this.width || 'auto',
          height: this.height || 'auto'
        }).attr('id', this.suffix + this.id).addClass('j-winbox-content');

        if (mask) {
          _mask = $(mask);
          wrapper.append(_mask);
        }

        wrapper.append(content).appendTo($('body'));

        this.position(content);

        if (mask) {
          var _h = (document.documentElement.scrollHeight > document.body.scrollHeight) ? (document.documentElement.scrollHeight) : (document.body.scrollHeight);
          _mask.css('height', _h);
        }

        return wrapper;
      },
      position: function (content) {
        content = content || this.dom.find('.j-winbox-content');
        content && content.css({
          left: this.left !== undefined ? this.left : parseInt($(window).width() - content.width()) / 2,
          top: this.top !== undefined ? this.top : parseInt(($(window).height() - content.height()) / 2 + $(window).scrollTop() - content.height() / 2)
        });
      }
    };

    var factory = function (tpl, opts) {
      return new WindowManager(tpl, opts);
    };
    return factory;
  })(win.$);

  if (typeof define === "function" && define.cmd) {
    define(function (require, exports, module) {
      module.exports = module_wm;
    });
  }
  else {
    win.qtool = win.qtool || {};
    win.qtool.winbox = module_wm;
  }
})(this);
