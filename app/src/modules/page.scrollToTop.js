var _ = require('underscore')
module.exports = function(exceptions, scrollTo){
  exceptions = exceptions || []
  return function(context, next){
    var isExcpection = _.some(exceptions, function(value){
      var regexp = new RegExp(value)
      return regexp.test(context.pathname)
    })
    if( scrollTo && !isExcpection){
      setTimeout(function(){
        console.log( 'scrollTo called' )
        scrollTo(0,0)
      })
    }

    next()
  }
}
