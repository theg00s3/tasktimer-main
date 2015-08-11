module.exports = function(context, next){
  next()

  var page = context.pathname.substring(1)

  var items = Array.prototype.slice.call(document.querySelectorAll('[role="header"] .menu a'))
  items.forEach(function(item){
    item.classList.remove('active')
    var link = item.getAttribute('id').replace('-link', '')
    if( page !== '' && new RegExp(page).test(item.getAttribute('id')) ){
      item.classList.add('active')
    }
  })
}
