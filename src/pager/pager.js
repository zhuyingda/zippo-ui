/**
 * @widget
 * @author zyd
 * @version 1.1.1
 * pager   -   分页
 * @author yingdazhu@icloud.com
 * @git github.com/zhuyingda/zippo-ui
 * @module commonJS
 * @require pager.less
 * @require pager.hbs
 * @require jquery
 */

//require('./pager.less');

var
  /**
   * @desc 初始化容器dom元素
   */
  //base = require('./pager_container.hbs'),
  base = function(){
    var str = '<div class="page-box clearfix"><div class="page-btn btn-style prev" style="float: left;">上一页</div><div class="page-wrap" style="float: left;"></div><div class="page-btn btn-style next" style="float: left;">下一页</div></div>';
    return str;
  },
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
  core(curPage);
}

/**
 * @desc 排列第pageNum页的按钮列表
 * @var begin 当前页从第begin页开始
 * @var end 当前页的最后一个按钮的页数
 * @var endPageNum 总页数
 * @var pagerContainer 组件容器
 */
function core(pageNum) {
  var
    begin,
    end,
    endPageNum = Math.ceil(total / itemInPage),
    pagerContainer = $('.page-wrap');

  begin = beginCal(pageNum, btnInPage, endPageNum);
  end = endCal(begin, btnInPage, endPageNum);

  pagerContainer.empty();
  for (var i = begin; i <= end; i++) {
    pagerContainer.append('<div class="page-item" style="float: left;cursor: pointer;">' + i + '</div>');
  }
  for (i = 0; i < $('.page-item').length; i++) {
    if (pageNum == $('.page-item').eq(i).html()) {
      $('.page-item').eq(i).addClass('btn-cur');
    }
  }

  edgeCheck(pageNum, endPageNum);
  curPage = pageNum;
}

/**
 * @desc 计算当前页翻页按钮列表的起始位
 */
function beginCal(pageNum, btns, endPageNum) {
  var mid = Math.round(btns / 2),
    rest = Math.abs(endPageNum - pageNum);
  if (pageNum <= mid) {
    return 1;
  } else if (pageNum > mid && rest >= mid) {
    return pageNum - mid + 1;
  } else if (rest < mid) {
    if (endPageNum > btns) {
      return endPageNum - (btns-1);
    } else {
      return 1;
    }
  }
}

/**
 * @desc 计算当前页翻页按钮列表的起末位
 */
function endCal(begin, btns, endPageNum) {
  if (btns <= endPageNum) {
    return btns + begin - 1;
  } else {
    return endPageNum;
  }
}

/**
 * @desc 按钮样式边界处理
 */
function edgeCheck(pageNum, endPageNum) {
  if (pageNum == 1) {
    $('.page-box').addClass('in-first-page').removeClass('in-last-page');
  } else if (pageNum == endPageNum) {
    $('.page-box').addClass('in-last-page').removeClass('in-first-page');
  } else {
    $('.page-box').removeClass('in-first-page in-last-page');
  }
}

/**
 * @desc 翻页回调
 */
function onTurn(cb) {
  $('.next').click(function () {
    if (!$('.page-box').hasClass('in-last-page')) {
      core(++curPage);
      cb(curPage);
    }
  });
  $('.prev').click(function () {
    if (!$('.page-box').hasClass('in-first-page')) {
      core(--curPage);
      cb(curPage);
    }
  });
  $('.page-wrap').on('click', '.page-item', function () {
    core($(this).html());
    cb($(this).html());
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