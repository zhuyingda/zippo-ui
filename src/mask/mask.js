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
maskLayer = require('./mask_layer.hbs'),
/**
 * @desc 当前弹层层级
 */
baseLevel = 10000,

/**
 * @desc 当前弹层层级
 */
maskId = 0,

/**
 * @desc 在修改html和body样式前备份其原有样式
 */
styleBackup = {},

/**
 * @desc 弹层管理器
 */
manager = {};

/**
 * @desc 初始化
 */
function init(tpl, options, id) {
    baseLevel++;
    var param = {
        maskId: maskId,
        baseLevel: baseLevel,
        height: Math.max($(document.body).height(), $(document).height(), $(window).height()) + 30,//30像素是因为可能存在的滚动条
        content: tpl.trim()
    };
    var html = maskLayer(param);
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
    var layer = $('#' + id + ' .zp_wrapper');
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
            if (baseLevel == 10000) {
                console.log(styleBackup.body);
                styleBackup.body != '' ? $('body').attr({'style': styleBackup.body}) : $('body').removeAttr('style');
                styleBackup.html != '' ? $('html').attr({'style': styleBackup.html}) : $('html').removeAttr('style');
            }
        });
    }
    manager[id] = null;
    manager[id] = undefined;
    delete manager[id];
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

function prefix(options, id) {
    if (!options.top) {
        $('#' + id + ' .zp_wrapper').css({
            'margin-top': '-' + $('.zp_wrapper').height() / 2 + 'px'
        });
    }
    if (!options.left) {
        $('#' + id + ' .zp_wrapper').css({
            'margin-left': '-' + $('.zp_wrapper').width() / 2 + 'px'
        });
    }
    $('#' + id).css({display: 'none', visibility: 'inherit'});
    if (styleBackup.body == undefined) {
        styleBackup.body = $('body').attr('style') == undefined ? '' : $('body').attr('style');
        styleBackup.html = $('html').attr('style') == undefined ? '' : $('html').attr('style');
        styleBackup.width = $('body').width();
    }
    $('body').css({overflow: 'hidden'}).width(styleBackup.width);
    $('html').css({overflow: 'hidden'});
}

/**
 * @desc 过滤器
 */
function optionFilter(o) {
    var opt = {};
    if (o == undefined) {
        return opt;
    }
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
