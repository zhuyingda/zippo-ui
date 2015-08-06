/**
 * @author zhuyingda
 * @type {{pager: {widget}, mask: {widget}, truncate: {util}}}
 */

module.exports = {
  pager: require('./src/pager/pager'),
  mask: require('./src/mask/mask'),
  truncate: require('./src/utils/truncate/truncate')
}