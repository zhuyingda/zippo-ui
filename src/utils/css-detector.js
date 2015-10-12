module.exports = function (prop) {
    var div = document.createElement('div');
    return div.style[prop] != undefined;
}
