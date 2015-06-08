var _ = require('underscore')
module.exports = function(exceptions){
  exceptions = exceptions || []
  return function(context, next){
    var isExcpection = _.some(exceptions, function(value, i, list){
      var regexp = new RegExp(value)
      return regexp.test(context.pathname)
    })
    if( window.scrollTo && !isExcpection){
      setTimeout(function(){
        window.scrollTo(0,0)
      })
    }

    next()
  }
}
