/**
 * @util
 * copy2clipboard   -   将字符串复制到剪贴板
 * @module commonJS
 * @desc 将字符串复制到系统剪贴板，兼容ie6，webkit、FF浏览器需要安装插件
 * @param {string} maintext 需要复制的字符串
 */

function copyToClipboard(maintext) {
  if (window.clipboardData) {
    window.clipboardData.setData("Text", maintext);
  } else if (window.netscape) {
    try {
      netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    } catch (e) {
      alert("该浏览器不支持一键复制！\n请手工复制文本框链接地址～");
    }

    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
    if (!clip) return;
    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
    if (!trans) return;
    trans.addDataFlavor('text/unicode');
    var str = new Object();
    var len = new Object();
    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
    var copytext = maintext;
    str.data = copytext;
    trans.setTransferData("text/unicode", str, copytext.length * 2);
    var clipid = Components.interfaces.nsIClipboard;
    if (!clip) return false;
    clip.setData(trans, null, clipid.kGlobalClipboard);
    alert("以下内容已经复制到剪贴板\n\n" + maintext);
  }
  alert("该浏览器不支持一键复制！\n请手工复制文本框链接地址～");
}

module.exports = {
  copyToClipboard: copyToClipboard
}