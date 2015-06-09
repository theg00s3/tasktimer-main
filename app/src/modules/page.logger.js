var logger = require('./Logger')
module.exports = function(context, next){
  logger.log('-- page: ', context.path)
  next()
}
