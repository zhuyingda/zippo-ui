zippo-ui — a developing JavaScript ui library
==================================================


简单介绍 What is zippo-ui?
----------------------------------------------
这是一个基于jquery的前端组件库，其中集成了一些前端开发工作中常见的UI组件并对其进行抽象和封装。不同的是，此组件库并不提供过多的UI样式，而是将前端交互逻辑抽象出来。开发这个组件库的初衷主要是：
- 将前端常用UI组件的交互逻辑抽象出来进行封装，提高开发效率
- 将ie环境下的bug在组件层面解决掉，节省开发时间
- 支持npm包管理方式在commonJs环境下开发，支持webpack、browserify等打包工具

同时，它具有以下特点：
- 轻量级：没有引入任何其他类库，代码体积小
- 易使用：api接口尽可能简单，降低学习成本和维护成本
- 基于jquery，主要解决国内PC端页面，向ie6兼容
- 提供umd版本，并且拥有整合版以及每一个子功能模块分别对应的打包js
- 支持在commonJs的前端代码预编译环境，如webpack、browserify
- 同时逐渐支持H5,ES6等新规范，同样为移动端页面提供相应优化

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
