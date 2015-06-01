var page = require('page')
var pageLogger = require('./modules/page.logger')

page('*', pageLogger, require('./pages/index'))

module.exports.start = page.start
