zippo-ui — a developing JavaScript ui library
==================================================


What is zippo-ui?
--------------------------------------
It is a web UI library of Javascript which provides a lot of individual components you may need in your daily web developing.
There is although a few problem in this function lib, but what I can promise is :
1 this library will never ignore the ie6 problems in PC web components;
2 as far as I can do for upward-compatible with future nx release versions;
3 every component has a unit test if you wanna see it;
4 most importantly, you can always contact me from e-mail or github issues for any problems you meet.


Install
--------------------------------------
```bash
npm install zippo-ui
```

Component-Mask Usage
--------------------------------------
```bash
var zippo = require('zippo-ui');
```
when you wanna create a mask and view something, you can put your HTML templates and options like this:
```bash
var m = zippo.mask.showMask('<xxx>your HTML code</xxx>',{animation:'fade'});
```

when you wanna shake it, try this:
```bash
m.shake();
```

when you wanna close it, you can do this:
```bash
m.close();
```

also, you can get all masks by:
```bash
var masks = zippo.mask.maskList();
console.log(masks);
```

Component-Pager Usage
--------------------------------------
```bash
var zippo = require('zippo-ui');
```

```bash
var pager = zippo.pager；
```

you can do anything in the callback function called-onTurn, the first param is the page number:
```bash
pager.init({
    $el : $('#page'),
    onTurn : function (curPage) {
      console.log('now the page is:', curPage);
    }
});
```

you can write this style in less or css, in first page or last page component would auto-add the style class:
```bash
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
```