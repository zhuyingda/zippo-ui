var options = {
  $item : $('.like-item'),
  $list : $('.like-list'),
  $btnL : $('.btn-left'),
  $btnR : $('.btn-right'),
  period : 3000,
  velocity : 300
};
slider(options);

function slider(opt) {
  var itemWidth = parseInt(opt.$item.css('width')) + parseInt(opt.$item.css('margin-right')),
    edgeLeft = '-' + (opt.$item.length - 5) * itemWidth + 'px',
    interval = null,
    timeout = null;
  opt.$list.css({width : opt.$item.length * itemWidth});
  opt.$btnL.click(turnLeft);
  opt.$btnR.click(turnRight);
  $(window).on({'sliderAnimationComplete' : play});
  opt.$list.mouseenter(stop).mouseleave(play);

  //play();

  function stop() {
    clearInterval(interval);
    interval = null;
    timeout = null;
  }

  function play() {
    if(interval === null) {
      timeout = setTimeout(function () {
        if(interval === null){
          interval = setInterval(function () {
            if(edgeLeft == curLeft()){
              animation('0px');
              return;
            }
            animation(parseInt(curLeft()) - itemWidth + 'px');
          },opt.period);
        }
      },1000);
    }
  }

  function turnLeft() {
    stop();
    animation(parseInt(curLeft()) + itemWidth + 'px');
  }

  function turnRight() {
    stop();
    animation(parseInt(curLeft()) - itemWidth + 'px');
  }

  function animation(left) {
    opt.$list.animate(
      {left : left},
      opt.velocity,
      'swing',
      edgeCheck
    );
  }

  function edgeCheck() {
    if(curLeft() == '0px') {
      opt.$btnL.addClass('disable').siblings().removeClass('disable');
    }else if (curLeft() == edgeLeft){
      opt.$btnR.addClass('disable').siblings().removeClass('disable');
    }else{
      opt.$btnL.removeClass('disable');
      opt.$btnR.removeClass('disable');
    }
    $(window).trigger('sliderAnimationComplete');
  }

  function curLeft() {
    return opt.$list.css('left');
  }
}