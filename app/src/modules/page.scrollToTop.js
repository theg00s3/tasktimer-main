module.exports = function(context, next){
  if( window.scrollTo )
    setTimeout(function(){
      window.scrollTo(0,0)
    })

  next()
}
