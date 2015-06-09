var logger = require('./Logger')

module.exports = function(context, next){
  logger.log('-- tracking: ', context.path)
  if( window.analytics ){
    setTimeout(analytics.page, 100)
  }
  next()
}
