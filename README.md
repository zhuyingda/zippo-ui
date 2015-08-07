zippo-ui — a developing JavaScript ui library
==================================================

Component-Mask Usage
--------------------------------------
```bash
var zippo = require('zippo-ui');
```
when you wanna create a mask and view something, you can put your HTML templates and options like this:
```bash
var w = zippo.mask.showMask('<xxx>your HTML code</xxx>',{animation:'fade'});
```

when you wanna shake it, try this:
```bash
w.shake();
```

when you wanna close it, you can do this:
```bash
w.close();
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