var page = require('page')

page('*', require('./modules/page.logger'))
page('/', require('./pages/main'))
page('/about', require('./pages/about'))

module.exports.start = page.start
