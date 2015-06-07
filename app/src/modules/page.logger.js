var logger = require('./logger')
module.exports = function(context, next){
  logger.log('-- page: ', context.path, context.pathname)
  next()
}
