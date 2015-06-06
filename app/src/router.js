var page = require('page')

page('*', require('./modules/page.logger'), require('./modules/page.tracker'), require('./modules/page.scrollToTop'))
page('/', require('./pages/Main'))
page('/about', require('./pages/About'))
page('/statistics', require('./pages/Statistics'))
page.exit(function(context, next){
  console.log('-- page exited', arguments)
  next()
})

module.exports.start = page.start
