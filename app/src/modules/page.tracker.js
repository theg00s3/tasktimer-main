var logger = require('./Logger')

module.exports = function(context, next){
  logger.log('-- tracking: ', context.path, context.pathname)
  if( window.analytics ){
    setTimeout(analytics.page, 100)
  }
  next()
}
