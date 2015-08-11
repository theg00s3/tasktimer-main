module.exports = function(context, next){
  next()

  var page = context.pathname.substring(1)

  var items = Array.prototype.slice.call(document.querySelectorAll('.activate-on'))
  items.forEach(function(item){
    item.classList.remove('active')
    if( page !== '' && new RegExp(page).test(item.dataset.active) ){
      item.classList.add('active')
    }
  })
}
