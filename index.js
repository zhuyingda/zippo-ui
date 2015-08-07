/**
 * @author zhuyingda
 * @type {{pager: {widget}, mask: {widget}, truncate: {util}, insert: {util}, clip: {util}}}
 */

module.exports = {
  pager: require('./src/pager/pager'),
  mask: require('./src/mask/mask'),
  util: {
    truncate: require('./src/utils/truncate/truncate'),
    insert: require('./sec/utils/insert/insert2cursor'),
    clip: require('./sec/utils/clipboard/copy2clipboard')
  }
}