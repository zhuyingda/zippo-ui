/**
 * @author zhuyingda
 * @type {{pager: {widget}, mask: {widget}, slider: {widget}, carousel: {widget}, matrix: {widget}, truncate: {util}, insert: {util}, clip: {util}}}
 */

module.exports = {
  pager: require('./pager/pager'),
  mask: require('./mask/mask'),
  slider: require('./slider/slider'),
  carousel: require('./carousel/carousel'),
  matrix: require('./matrix/matrix'),
  util: {
    truncate: require('./utils/truncate/truncate'),
    insert: require('./utils/insert/insert2cursor'),
    clip: require('./utils/clipboard/copy2clipboard'),
    console: require('./utils/console'),
    bind: require('./utils/bind'),
    cssDetector: require('./utils/css-detector')
  }
}
