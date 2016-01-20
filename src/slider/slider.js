/**
 * @widget
 * slider   -   轮播图
 * @author yingdazhu@icloud.com
 * @git github.com/zhuyingda/zippo-ui
 * @module commonJS
 * @require slider.hbs
 * @require jquery
 */
var

/**
 * @desc 渲染dom
 */
container = require('./container-slide.hbs'),

/**
 * @desc css检测器
 */
canUse = require('../utils/css-detector'),

/**
 * @desc 资源
 */
fixConsole = require('../utils/console')(),

/**
 * @desc 动画库
 */
velocity = canUse('transform') ? require('velocity-animate') : null,

/**
 * @desc 每个轮播图实例的标识
 */
flag = 0,

/**
 * @desc 轮播定时器
 */
Loop = function (cb, time, resLen) {
    var inter = null,
    curItem = resLen - 1;
    return {
        play: function () {
            if (!resLen) {
                return;
            }
            if (inter !== null) {
                return;
            }
            inter = setInterval(function () {
                curItem = curItem == resLen - 1 ? 0 : curItem + 1;
                cb(curItem);
            }, time);
        },
        stop: function () {
            clearInterval(inter);
            inter = null;
        },
        isPlay: function () {
            return inter != null;
        },
        setCurItem: function (i) {
            curItem = i;
        },
        getCurItem: function () {
            return curItem;
        }
    }
};

function prefix(options) {
    var o = options;
    if (!o.$el) {
        console.warn('you should choose a $dom for building your slider.')
    }
    return o;
}

function Slider(options) {
    var
    /**
     * @desc 动画锁
     */
    lock = false,

    /**
     * @desc 身份标识
     */
    sid = ++flag,

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
        width: 0,
        height: 0,
        openInNewTab: false,
        transformTime: 500,
        cb: function (i) {
            console.log(i);
        }
    },

    /**
     * @desc 资源数据
     */
    res = [];

    var o = prefix(options);
    config = $.extend(config, o);

    res = o.res;

    var loop = new Loop(function (i) {
        transform(i);
    }, config.period, res.length);

    if (config.type == 'slide') {
        config.$el.html(container({
            flag: sid,
            list: res,
            listHead: {
                href: res[res.length - 1].href,
                img: res[res.length - 1].img
            },
            listEnd: {
                href: res[0].href,
                img: res[0].img,
                lastIndex: res.length
            },
            width: config.width,
            height: config.height,
            openType: config.openInNewTab ? '_blank' : '_self'
        }));
        //todo: 根据浏览器对CSS3的支持情况选择不同的动画执行方式
        if (canUse('transform')) {
            $('.zp_s' + sid + ' .zp_slider').css({transform: 'translateX(-' + config.width + 'px)'});
        } else {
            $('.zp_s' + sid + ' .zp_slider').css({left: '-' + config.width + 'px'});
        }
    }

    $('.zp_s' + sid).mouseenter(function () {
        loop.stop();
    }).mouseleave(function () {
        loop.play();
    });

    loop.play();

    this.turn = function (i) {
        i--;
        if (lock || i == loop.getCurItem()) {
            return;
        }
        lock = true;
        loop.stop();
        loop.setCurItem(i);
        if (config.type == 'slide') {
            _slide(i);
        }
    };

    function transform(i) {
        if (lock) {
            return;
        }
        lock = true;
        if (config.type == 'slide') {
            _slide(i);
        }
    }

    function _slide(i) {
        var iNext = i + 2;
        //todo: 根据浏览器对CSS3的支持情况选择不同的动画执行方式
        if (canUse('transform')) {
            var curTranslateX = '';
            $('.zp_s' + sid + ' .zp_slider').css('transform').replace(/[\w|\W]*(-.*),[\w|\W]*/, function (s, $1) {
                curTranslateX = $1;
            });
            $('.zp_s' + sid + ' .zp_slider').velocity({translateX: ['-' + config.width * iNext + 'px', curTranslateX + 'px']}, config.transformTime, 'swing', function () {
                if (iNext == res.length + 1) {
                    $('.zp_s' + sid + ' .zp_slider').css({transform: 'translateX(-' + config.width + 'px)'});
                }
                lock = false;
                if (!loop.isPlay()) {
                    loop.play();
                }
                var curItem = loop.getCurItem() == res.length - 1 ? 0 : loop.getCurItem() + 1;
                config.cb(curItem);
            });
        } else {
            $('.zp_s' + sid + ' .zp_slider').animate({left: '-' + config.width * iNext + 'px'}, config.transformTime, 'swing', function () {
                if (iNext == res.length + 1) {
                    $('.zp_s' + sid + ' .zp_slider').css({left: '-' + config.width + 'px'});
                }
                lock = false;
                if (!loop.isPlay()) {
                    loop.play();
                }
                var curItem = loop.getCurItem() == res.length - 1 ? 0 : loop.getCurItem() + 1;
                config.cb(curItem);
            });
        }
    }
}

function init(options) {
    return new Slider(options);
}

module.exports = {
    init: init
}
