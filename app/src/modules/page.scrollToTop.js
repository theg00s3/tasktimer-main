var _ = require('underscore')
module.exports = function(exceptions, scrollTo){
  exceptions = exceptions || []
  return function(context, next){
    var isExcpection = _.some(exceptions, function(value, i, list){
      var regexp = new RegExp(value)
      return regexp.test(context.pathname)
    })
    if( scrollTo && scrollTo instanceof Function && !isExcpection){
      setTimeout(function(){
        scrollTo(0,0)
      })
    }

    next()
  }
}
