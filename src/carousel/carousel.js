/**
 * @widget
 * @author zyd
 * @version 1.3.2
 * pager   -   轮播列表
 * @author yingdazhu@icloud.com
 * @git github.com/zhuyingda/zippo-ui
 * @module commonJS
 * @require carousel.hbs
 * @require jquery
 */
var
/**
 * @desc 渲染dom
 */
tpl = require('./tpl.hbs'),

/**
 * @desc 每个轮播图实例的标识
 */
flag = 0,

/**
 * @desc 资源
 */
fixConsole = require('../utils/console'),

/**
 * @desc 资源
 */
fixBind = require('../utils/bind'),

/**
 * @desc 轮播定时器
 */
Loop = function (cb, time) {
    var inter = null;
    return {
        play: function () {
            if (inter !== null) {
                return;
            }
            inter = setInterval(function () {
                cb();
            }, time);
        },
        stop: function () {
            clearInterval(inter);
            inter = null;
        },
        isPlay: function () {
            return inter != null;
        }
    }
};


fixConsole();

function prefix(options) {
    var o = options;
    if (!o.$el) {
        console.warn('you should choose a $dom for building your carousel.')
    }
    return o;
}

function Carousel(options) {
    var

    /**
     * @desc 组件实例的标识
     */
    cid = ++flag,

    /**
     * 动画锁
     * @type {boolean}
     */
    lock = false,

    /**
     * @desc 配置
     */
    config = {
        $el: {},
        autoPlay: true,
        period: 5000,
        transformTime: 500,
        width: 0,
        step: 1,
        itemWidth: 0,
        height: 0,
        res: [],
        cb: function (orientation) {
            console.log('turning animate was:', orientation);
        }
    };

    var o = prefix(options);
    config = $.extend(config, o);

    var r = [];
    $.map(config.res, function (i) {
        r.push({
            content: i,
            width: config.itemWidth,
            height: config.height
        });
    });
    config.$el.html(tpl({
        list: r,
        listW: config.itemWidth * r.length,
        width: config.width,
        height: config.height,
        flag: cid
    }));

    fixBind();
    var loop = new Loop(function () {
        this.turnRight();
    }.bind(this), config.period);
    loop.play();

    $('.zp_c' + cid).mouseenter(function () {
        loop.stop();
    }).mouseleave(function () {
        if (!loop.isPlay()) {
            loop.play();
        }
    });

    function curLeft() {
        return $('.zp_c' + cid + ' .zp_carousel').css('left');
    }

    this.turnRight = function () {
        if (lock) {
            return;
        }
        lock = true;
        loop.stop();
        $('.zp_c' + cid + ' .zp_carousel').animate({'left': '-' + config.itemWidth * config.step + 'px'}, config.transformTime, 'swing', function () {
            $('.zp_c' + cid + ' .zp_carousel').append($('.zp_c' + cid + ' .zp_c_item').slice(0, config.step)).css({'left': '0px'});
            loop.play();
            lock = false;
        });
    };

    this.turnLeft = function () {
        if (lock) {
            return;
        }
        lock = true;
        loop.stop();
        $('.zp_c' + cid + ' .zp_carousel').prepend($('.zp_c' + cid + ' .zp_c_item').slice($('.zp_c' + cid + ' .zp_c_item').length-config.step,$('.zp_c' + cid + ' .zp_c_item').length))
            .css({'left': '-' + config.itemWidth * config.step + 'px'})
            .animate({'left': parseInt(curLeft()) + config.itemWidth * config.step + 'px'}, config.transformTime, 'swing', function () {
                loop.play();
                lock = false;
            });
    };

}

function init(options) {
    return new Carousel(options);
}

module.exports = {
    init: init
}
