/**
 * @util
 * insert2cursor   -   input/textarea内容插入
 * @module commonJS
 * @desc 将字符串插入到input/textarea光标所在位置，兼容ie6
 * @param {elem} field 原生input/textarea标签元素对象
 * @param {string} val 需要插入的内容
 */

function index(field, val) {
  if (document.selection) {
    field.focus();
    sel.text = val;
    sel.select();
  } else if (field.selectionStart || field.selectionStart == '0') {
    var startPos = field.selectionStart;
    var endPos = field.selectionEnd;
    var restoreTop = field.scrollTop;
    field.value = field.value.substring(0, startPos) + val + field.value.substring(endPos, field.value.length);
    if (restoreTop > 0) {
      field.scrollTop = restoreTop;
    }
    field.focus();
    field.selectionStart = startPos + val.length;
    field.selectionEnd = startPos + val.length;
  } else {
    field.value += val;
    field.focus();
  }
}

module.exports = {
  exec: index
}