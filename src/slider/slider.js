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
$t = require('jquery.transit'),
/**
 * @desc 渲染dom
 */
container = require('./container-slide.hbs'),

/**
 * @desc css检测器
 * @type {*|exports|module.exports}
 */
canUse = require('../utils/css-detector'),

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
    width: 0,
    height: 0,
    transformTime: 500
},

res = [],

/**
 * @desc 资源
 */
fixConsole = require('../utils/console'),

/**
 * @desc 轮播定时器
 */
Loop = function (cb) {
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
            inter = null;
        },
        isPlay: function () {
            return inter != null;
        },
        setCurItem: function (i) {
            curItem = i;
        }
    }
};

var loop = new Loop(function (i) {
    transform(i);
});

function init(options) {
    var o = prefix(options);
    config = $.extend(config, o);

    res = o.res;
    $.map(res, function (i) {
        i.width = config.width;
        i.height = config.height;
    });
    if (config.type == 'slide') {
        config.$el.html(container({
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
        if (canUse('transform')) {
            $t('.zp_slider').css({x: '-' + config.width + 'px'});
        } else {
            $('.zp_slider').css({left: '-' + config.width + 'px'});
        }
    }

    loop.play();
}

function transform(i) {
    if (lock) {
        return;
    }
    lock = true;
    if (config.type == 'slide') {
        _slide(i);
    }
}

function turn(i) {
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
}

function _slide(i) {
    var iNext = i + 2;
    if (canUse('transform')) {
        $t('.zp_slider').transition({x: '-' + config.width * iNext + 'px'}, config.transformTime, '_default', function () {
            if (iNext == res.length + 1) {
                $t('.zp_slider').css({x: '-' + config.width + 'px'});
            }
            lock = false;
            if (!loop.isPlay()) {
                loop.play();
            }
        })
    } else {
        $('.zp_slider').animate({left: '-' + config.width * iNext + 'px'}, config.transformTime, '_default', function () {
            if (iNext == res.length - 1) {
                $('.zp_slider').css({left: '-' + config.width + 'px'});
            }
            lock = false;
            if (!loop.isPlay()) {
                loop.play();
            }
        });
    }
}

function prefix(options) {
    var o = options;
    if (!o.$el) {
        console.warn('you should choose a $dom for building your slider.')
    }
    return o;
}

module.exports = {
    init: init,
    turn: turn
}
