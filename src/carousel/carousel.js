require('./like.less');

var
  /**
   * @desc 定时器
   */
  interval = null,

  /**
   * @desc 延迟器
   */
  timeout = null,

  /**
   * @desc 轮播每个元素的宽度
   */
  itemWidth = 0,

  /**
   * @desc 配置
   */
  opt = {};

function stop() {
  clearInterval(interval);
  interval = null;
  timeout = null;
}

function play() {
  if (interval === null) {
    timeout = setTimeout(function () {
      if (interval === null) {
        interval = setInterval(function () {
          opt.$list.animate({'left': '-' + itemWidth + 'px'}, opt.velocity, 'swing', function () {
            opt.$list.append(opt.$item.first()).css({'left': '0px'});
          });
        }, opt.period);
      }
    }, 1000);
  }
}

function turnLeft() {
  stop();
  opt.$list.prepend(opt.$item.last())
    .css({'left': '-' + itemWidth + 'px'})
    .animate({'left': parseInt(curLeft()) + itemWidth + 'px'}, opt.velocity, 'swing', play);
}

function turnRight() {
  stop();
  opt.$list.animate({'left': '-' + itemWidth + 'px'}, opt.velocity, 'swing', function () {
    opt.$list.append(opt.$item.first()).css({'left': '0px'});
    play();
  });
}

function curLeft() {
  return opt.$list.css('left');
}

function on() {
  opt.$item.mouseenter(function () {
    opt.$mask.eq($(this).index()).slideDown(300);
  }).mouseleave(function () {
    opt.$mask.not($(this).index())
      .removeAttr('style')
      .hide()
      .clearQueue()
      .eq($(this).index())
      .slideUp(200);
  });
}

function init(option) {
  opt = option;
  itemWidth = parseInt(opt.$item.css('width')) + parseInt(opt.$item.css('margin-right'));
  interval = null;
  timeout = null;
  opt.$list.css({width: opt.$item.length * itemWidth});
  opt.$btnL.click(turnLeft);
  opt.$btnR.click(turnRight);
  opt.$list.mouseenter(stop).mouseleave(play);

  on();

  play();
}

module.exports = {
  init: init
}