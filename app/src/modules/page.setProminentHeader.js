module.exports = function(context, next){
  next()

  var mainHeader = document.getElementById('main-header')

  var page = context.pathname.substring(1)
  if( ['about','statistics'].indexOf(page) >= 0 ){
    mainHeader.classList.add('white')
  }else{
    mainHeader.classList.remove('white')
  }
}
