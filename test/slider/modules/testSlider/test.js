var slider = require('../../../../../index').slider;
//var slider = require('zippo-ui').slider;

function run() {
  slider.init({
    $el : $('#slider')
  });
}

module.exports = {
  unitTest: run
}