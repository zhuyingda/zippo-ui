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
     * @desc 配置
     */
    cid = ++flag,

    /**
     * @desc 配置
     */
    config = {
        $el: {},
        autoPlay: true,
        period: 5000,
        transformTime: 500,
        width: 0,
        itemWidth: 0,
        height: 0,
        res: [],
        cb: function (orientation) {
            console.log('turning animate was:', orientation);
        }
    };

    var o = prefix(options);
    config = $.extend(config, o);

    fixConsole();

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
        listW: config.itemWidth*r.length,
        width: config.width,
        height: config.height,
        flag: cid
    }));

    var loop = new Loop(function () {
        this.turnRight();
    }.bind(this), config.period);
    loop.play();

    function curLeft() {
        return $('.zp_c'+cid+' .zp_carousel').css('left');
    }

    this.turnRight = function () {
        loop.stop();
        $('.zp_c'+cid+' .zp_carousel').animate({'left': '-' + config.itemWidth + 'px'}, config.transformTime, 'swing', function () {
            $('.zp_c'+cid+' .zp_carousel').append($('.zp_c'+cid+' .zp_c_item').first()).css({'left': '0px'});
            loop.play();
        });
    };

    this.turnLeft = function () {
        loop.stop();
        $('.zp_c'+cid+' .zp_carousel').prepend($('.zp_c'+cid+' .zp_c_item').last())
            .css({'left': '-' + config.itemWidth + 'px'})
            .animate({'left': parseInt(curLeft()) + config.itemWidth + 'px'}, config.transformTime, 'swing', loop.play);
    };
}

function init(options) {
    return new Carousel(options);
}

module.exports = {
    init: init
}
