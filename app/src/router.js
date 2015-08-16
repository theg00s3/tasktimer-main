var page = require('page')

page('*', require('./modules/page.logger')
        , require('./modules/page.tracker')
        , require('./modules/page.scrollToTop')(['statistics'], window.scrollTo)
        , require('./modules/page.setActiveMenuItem')
    )

page('/', require('./routes/Dashboard'))
page('/about', require('./routes/About'))
page('/statistics', require('./routes/Statistics'))
page('/profile', require('./routes/Profile'))
page('/blog', passthrough)
page('/auth/logout', passthrough)

page('*', require('./routes/Fourofour'))

module.exports.start = page.start

function passthrough(context){
  window.location = context.pathname
}
