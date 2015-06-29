/**
 * @widget
 * @author zyd
 * @version 1.0
 * page   -   分页
 * @module commonJS
 * @require page.less
 * @require page.handlebars
 * @require jquery
 */

require('./page.less');

var
  /**
   * @desc 翻页模块骨架
   */
  base = require('./page.handlebars'),

  /**
   * @desc 当前所在页（从1开始）
   */
  curPage = 1,

  /**
   * @desc 评论总条数
   */
  total = 0;

/**
 * @desc 获取当前页
 */
function getCurPage(){
  return curPage;
}

/**
 * @desc 设置总条数
 */
function setTotal(n){
  total = n;
  renderPager(curPage);
}

/**
 * @desc 翻到第x页
 */
function renderPager(pageNum){
  var
    /**
     * @desc 每页显示的评论数
     */
    itemInPage = options.limit,
    /**
     * @desc 每页显示的翻页按钮数
     */
    limit = 10,
    /**
     * @desc 当前页从第begin页开始
     */
    begin,
    /**
     * @desc 总页数
     */
    pageLen = Math.ceil(total / itemInPage) + 1,
    /**
     * @desc 总页数
     */
    pagerContainer = $('.page-wrap');

  begin = beginCal(pageNum, limit, pageLen);
  /**
   * @desc 渲染翻页列表
   */
  pagerContainer.empty();
  for(var i=begin;i<begin+limit;i++){
    pagerContainer.append('<div class="page-item">' + i + '</div>');
  }
  for(i=0;i<$('.page-item').length;i++) {
    if (pageNum == $('.page-item:eq('+i+')').html()) {
      $('.page-item:eq('+i+')').addClass('btn-green');
    }
  }

  edgeCheck(pageNum, pageLen);
  curPage = pageNum;
}

/**
 * @desc 计算当前页翻页按钮列表的起始位和末位
 */
function beginCal(pageNum, limit, pageLen){
  if(pageNum <= Math.round(limit/2)){
    return 1;
  }else if(pageNum > Math.round(limit/2) && Math.abs((pageLen-1)-pageNum) >= Math.round(limit/2)){
    return pageNum - Math.round(limit/2) + 1;
  }else if(Math.abs((pageLen-1)-pageNum) < Math.round(limit/2)){
    if(pageLen > limit){
      return pageLen - limit;
    }else{
      return 1;
    }
  }
}

/**
 * @desc 按钮样式边界处理
 */
function edgeCheck(pageNum, pageLen){
  if(pageNum == 1){
    $('.page-box').addClass('in-first-page').removeClass('in-last-page');
  }else if(pageNum == pageLen-1){
    $('.page-box').addClass('in-last-page').removeClass('in-first-page');
  }else{
    $('.page-box').removeClass('in-first-page in-last-page');
  }
}

/**
 * @desc 翻页回调
 */
function onTurn(func) {
  $('.next').click(function () {
    if(!$('.page-box').hasClass('in-last-page')){
      renderPager(++curPage);
      func(curPage);
    }
  });
  $('.prev').click(function () {
    if(!$('.page-box').hasClass('in-first-page')){
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
function init(opts){
  var cont = base();
  opts.$el.html(cont);
  $('.page-item').click(function () {
    $(this).addClass('btn-green').siblings().removeClass('btn-green');
  });
  onTurn(opts.onTurn || function(){console.log('未绑定翻页回调')});
  renderPager(1);
}

module.exports = {
  getCurPage: getCurPage,
  setTotal: setTotal,
  init: init
}