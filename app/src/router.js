var page = require('page')

page('*', require('./modules/page.logger')
        , require('./modules/page.tracker')
        , require('./modules/page.scrollToTop')(['statistics'], window.scrollTo)
        , require('./modules/page.setActiveMenuItem')
    )

page('/', require('./routes/dashboard'))
page('/about', require('./routes/about'))
page('/statistics', require('./routes/statistics'))
page('/profile', require('./routes/profile'))
page('/blog', passthrough)
page('/auth/logout', passthrough)

page('*', require('./routes/fourofour'))

module.exports.start = page.start

function passthrough(context){
  window.location = context.pathname
}
