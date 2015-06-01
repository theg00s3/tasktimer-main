module.exports = function(context, next){
  console.log('-- page: ', context.path, context.pathname)
  next()
}
