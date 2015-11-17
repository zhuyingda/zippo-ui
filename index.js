/**
 * @author zhuyingda
 * @type {{pager: {widget}, mask: {widget}, slider: {widget}, carousel: {widget}, matrix: {widget}, truncate: {util}, insert: {util}, clip: {util}}}
 */

module.exports = {
  pager: require('./src/pager/pager'),
  mask: require('./src/mask/mask'),
  slider: require('./src/slider/slider'),
  carousel: require('./src/carousel/carousel'),
  matrix: require('./src/matrix/matrix'),
  util: {
    truncate: require('./src/utils/truncate/truncate'),
    insert: require('./src/utils/insert/insert2cursor'),
    clip: require('./src/utils/clipboard/copy2clipboard'),
    console: require('./src/utils/console'),
    bind: require('./src/utils/bind'),
    cssDetector: require('./src/utils/css-detector')
  }
}
