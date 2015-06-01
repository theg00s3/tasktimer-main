var page = require('page')
var pageLogger = require('./modules/page.logger')

page('/', pageLogger, require('./pages/index'))
page('/about', pageLogger, require('./pages/about'))

module.exports.start = page.start
