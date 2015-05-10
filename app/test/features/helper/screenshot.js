var fs = require('fs');

module.exports = function(spec){
  var specName = spec.description.split(' ').join('_');
  browser.takeScreenshot().then(function(png){
    var stream = fs.createWriteStream('test/e2e/screenshots/'+specName+'.png');
    stream.write(png,'base64');
    stream.end();
  });
}