module.exports = function(context, next){

  var page = context.pathname ? context.pathname.substring(1) : context

  var items = Array.prototype.slice.call(document.querySelectorAll('.activate-on'))
  items.forEach(function(item){
    item.classList.remove('active')
    if( page !== '' && new RegExp('^/?'+ page + '$').test(item.dataset.active) ){
      item.classList.add('active')
    }
  })

  if( typeof next === 'function' ){
    next()
  }
}
