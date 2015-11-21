zippo-ui — a developing JavaScript ui library
==================================================


简单介绍 What is zippo-ui?
----------------------------------------------
这是一个基于jquery的前端组件库，其中集成了一些前端开发工作中常见的UI组件并对其进行抽象和封装。不同的是，此组件库并不提供过多的UI样式，而是将前端交互逻辑抽象出来。开发这个组件库的初衷主要是：
- 前端开发过程中，很多交互组件涉及到动画效果，这部分有关动画的业务逻辑与界面样式之间基本没有耦合度，完全可以抽象出来进行封装复用
- 涉及到动画和用户之间的交互效果的UI组件，如果代码健壮性考虑不周往往会在快速暴力的操作情况下出现UI错位、动画紊乱的情况，此插件库通过一系列动画锁的机制解决此类情况
- 同时支持umd打包的外链js方式引入library和以commonJs的模块化npm包方式引入项目进行开发和使用

同时，它具有以下特点：
- 轻量级、易使用
- 基于jquery，主要解决国内PC端页面，向ie6兼容
- 提供umd版本，并且拥有整合版以及每一个子功能模块分别对应的打包js
- 支持在commonJs的前端代码预编译环境，如webpack

函数库状态
----------------------------------------------
- 开发中...
- 目前实现了分页、轮播图、轮播列表、页面弹层、阵列布局，共5个UI组件及相关util包

组件使用方式
----------------------------------------------
- 外链js的引入方式，可以直接参考test目录下的几个例子
- commonJs开发环境中，可以直接通过npm安装:
```bash
npm install zippo-ui
```
- 接下来在commonJs中，首先引入zippo，以下各个组件都代码示例都基于此:
```js
var zippo = require('zippo-ui');
```
- Mask组件的使用示例:
```js
//显示弹层
var m = zippo.mask.showMask(tpl,{animation:'fade'});
//关闭弹层
m.close();
```
- pager分页组件的使用示例:
```js
//组件初始化
zippo.pager.init({
    $el: $('#pager'),
    btnInPage: 10,
    itemInPage: 14,
//onTurn是翻页事件的回调,第一个参数是当前翻到的页码
    onTurn: function (p) {
        console.log(p);
    }
});
//设置总条数，组件初始化时需要设置，也可以在运行过程中随时重置
zippo.pager.setTotal(70);
```
- carousel轮播列表组件的使用示例:
```js
//组件初始化
var c = zippo.carousel.init({
            $el: $('#carousel'),
            width: 200,
            itemWidth: 100,
            height: 100,
            res: [
                '<p>123</p>',
                '<p>123</p>',
                '<p>123</p>',
                '<p>123</p>',
            ]
        });
//向左滑动
c.turnLeft()
//向右滑动
c.turnRight()
```

- slider轮播图组件的使用示例:
```js
//组件初始化
var s = zippo.slider.init({
    height: 200,
    width: 500,
    $el: $('#slider'),
    res: [
        {
            img: 'a.png',
            href: 'http://www.haosou.com'
        },
        {
            img: 'a.png',
            href: 'http://www.haosou.com'
        },
        {
            img: 'a.png',
            href: 'http://www.haosou.com'
        },
        {
            img: 'a.png',
            href: 'http://www.haosou.com'
        }
    ],
//翻页后的回调函数，第一个参数为页码
    cb: function (i) {
        console.log(i)
    }
});
//翻到第n页
s.turn(n);
```
