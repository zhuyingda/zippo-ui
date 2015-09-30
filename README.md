zippo-ui — a developing JavaScript ui library
==================================================


简单介绍 What is zippo-ui?
----------------------------------------------
主要对目前各大主流网站页面中常用的一些UI组件、场景进行了抽象和封装，组成了一个工具集，服务于日常的开发工作。
我对这个工具集的初衷是，在简单易用的前提下提高前端开发效率。
组件库强依赖于jQuery，主要应用场景是PC端web页面。

It is a web UI library of Javascript which provides a lot of individual components you may need in your daily web developing.
There is although a few problem in this function lib, but what I can promise is :

- this library will never ignore the ie6 problems in PC web components;
- as far as I can do for upward-compatible with future nx release versions;
- every component has a unit test if you wanna see it;
- most importantly, you can always contact me from e-mail or github issues for any problems you meet.


引入方式 Install
----------------------------------------------
```bash
npm install zippo-ui
```

弹层组件用法 Component-Mask Usage
----------------------------------------------
This component just like the [modal](http://getbootstrap.com/javascript/#modals) in bootstrap, but you can shake it.
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

分页组件用法 Component-Pager Usage
----------------------------------------------
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

you can option the items count or button count in it by:
```bash
pager.init({
    $el : $('#page'),
    btnInPage: 10,
    itemInPage: 5,
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