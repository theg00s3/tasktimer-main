var page = require('page')

page('*', require('./modules/page.logger'))
page('/', require('./pages/Main'))
page('/about', require('./pages/About'))

module.exports.start = page.start
