module.exports = function(context, next){
  console.log('-- tracking: ', context.path, context.pathname)
  if( window.analytics ){
    setTimeout(analytics.page, 100)
  }
  next()
}
