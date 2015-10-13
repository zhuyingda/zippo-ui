/**
 * @author zhuyingda
 * @type {{pager: {widget}, mask: {widget}, truncate: {util}, insert: {util}, clip: {util}}}
 */

module.exports = {
  pager: require('./src/pager/pager'),
  mask: require('./src/mask/mask'),
  slider: require('./src/slider/slider'),
  matrix: require('./src/matrix/matrix'),
  util: {
    truncate: require('./src/utils/truncate/truncate'),
    insert: require('./src/utils/insert/insert2cursor'),
    clip: require('./src/utils/clipboard/copy2clipboard')
  }
}
