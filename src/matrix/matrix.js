/**
 * @widget
 * @author zyd
 * @version 1.1.1
 * matrix   -   阵列布局
 * @author yingdazhu@icloud.com
 * @git github.com/zhuyingda/zippo-ui
 * @module commonJS
 * @require jquery
 */

var
/**
 * 配置项
 * @type {{}}
 */
config = {
    $el: null,
    containerWidth: 0,
    containerHeight: 0,
    itemWidth: 0,
    itemHeight: 0,
    marginVertical: 8,
    marginHorizontal: 8,
    res: [],
    type: 'default'
},
/**
 * 渲染模板
 * @type {*}
 */
template = require('./tpl.hbs');

function init (options){
    var o = prefix(options);
    config = $.extend(config, o);

    var param = {res: []};

    $.map(config.res, function () {
        param.res.push({});
    });
    $.map(param.res, function (i, key) {
        i.width = config.itemWidth;
        i.height = config.itemHeight;
        i.marginVertical = config.marginVertical;
        i.marginHorizontal = config.marginHorizontal;
        i.content = config.res[key];
    });
    param.containerWidth = config.containerWidth;
    param.containerHeight = config.containerHeight;
    param.marginHorizontal = config.marginHorizontal;
    param.marginVertical = config.marginVertical;

    config.$el.html(template(param));
}

function prefix(options) {
    var o = options;
    if (!o.$el) {
        console.warn('you should choose a $dom for building your slider.')
    }
    return o;
}

module.exports = {
    init: init
}
