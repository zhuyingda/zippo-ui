/**
 * @desc 在textarea中插入字符串
 */
function insertAtCursor(field, val) {
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
  insertAtCursor: insertAtCursor
}