zippo-ui — a developing JavaScript ui library
==================================================

Component-Mask Usage
--------------------------------------

var zippo = require('zippo-ui');

when you wanna create a mask and view something, you can put your HTML templates and options like this:
var w = zippo.mask.showMask('<div style="background: #fff;"><p>this is a test info line</p><p>this is also a test line!</p></div>',{animation:'fade'});

when you wanna shake it, try this:
w.shake();

when you wanna close it, you can do this:
w.close();

Component-Pager Usage
--------------------------------------

var zippo = require('zippo-ui');

var pager = zippo.pager；
pager.init({
    $el : $('#page'),
    onTurn : function (curPage) {
      pageAt(curPage);
    }
});

you can write this style in less or css, in first page or last page component would auto-add the style class:
.page-box.in-first-page{
  .prev{
    background: #e0e0e0;
  }
}
.page-box.in-last-page{
  .next{
    background: #e0e0e0;
  }
}