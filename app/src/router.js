var page = require('page')

page('*', require('./modules/page.logger'), require('./modules/page.tracker'))
page('/', require('./pages/Main'))
page('/about', require('./pages/About'))
page('/statistics', require('./pages/Statistics'))

module.exports.start = page.start
