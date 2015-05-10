angular.module('app')
.service('utils', function(constants){
  var self = this

  self.trimDecimals = function(number,numberOfDecimals){
    var decimals = Math.pow(10,numberOfDecimals)
    return parseInt(number*decimals,10)/decimals
  }

  self.getCurrentDay = function(){
    return moment(Date.now()).format(constants.dateFormat)
  }

  self.getCurrentWeek = function(){
    return moment().format(constants.weekFormat)
  }

  self.loseFocus = function(){
    var firstLink = document.getElementsByTagName('a')[0]
    if( firstLink ){
      firstLink.focus()
      firstLink.blur()
    }
  }
})
