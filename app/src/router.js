var page = require('page')

page('*', require('./modules/page.logger')
        , require('./modules/page.tracker')
        , require('./modules/page.scrollToTop')(['statistics'], window.scrollTo)
        , require('./modules/page.setActiveMenuItem')
    )

page('/', require('./pages/Main'))
page('/about', require('./pages/About'))
page('/statistics', require('./pages/Statistics'))
page('/profile', require('./pages/Profile'))
page('/blog', passthrough)
page('/auth/logout', passthrough)

page('*', require('./pages/FourOFour'))

module.exports.start = page.start

function passthrough(context){
  window.location = context.pathname
}
