/**
 * @widget
 * @author zyd
 * @version 1.3.2
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
fixConsole = require('../utils/console'),

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

fixConsole();

function prefix(options) {
    var o = options;
    if (!o.$el) {
        console.warn('you should choose a $dom for building your slider.')
    }
    return o;
}

function Slider(options){
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

    $.map(res, function (i) {
        i.width = config.width;
        i.height = config.height;
    });
    if (config.type == 'slide') {
        config.$el.html(container({
            flag: sid,
            list: res,
            listHead: {
                width: config.width,
                height: config.height,
                href: res[res.length - 1].href,
                img: res[res.length - 1].img
            },
            listEnd: {
                width: config.width,
                height: config.height,
                href: res[0].href,
                img: res[0].img,
                lastIndex: res.length
            },
            width: config.width,
            height: config.height
        }));
        //todo: jquery.transition所依赖的jquery版本过新
        if (canUse('transformssssssss')) {

        } else {
            $('.zp_s'+sid+' .zp_slider').css({left: '-' + config.width + 'px'});
        }
    }

    $('.zp_s'+sid).mouseenter(function () {
        loop.stop();
    }).mouseleave(function () {
        loop.play();
    });

    loop.play();

    this.turn = function (i) {
        i--;
        if (lock) {
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
        //todo: jquery.transition所依赖的jquery版本过新
        if (canUse('transformsssssssss')) {

        } else {
            $('.zp_s'+sid+' .zp_slider').animate({left: '-' + config.width * iNext + 'px'}, config.transformTime, 'swing', function () {
                if (iNext == res.length + 1) {
                    $('.zp_s'+sid+' .zp_slider').css({left: '-' + config.width + 'px'});
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

function init(options){
    return new Slider(options);
}

module.exports = {
    init: init
}
