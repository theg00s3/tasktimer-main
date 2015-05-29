angular.module('app')
.config( function(constants, $localForageProvider, $compileProvider, $uiViewScrollProvider, $urlMatcherFactoryProvider){
  $localForageProvider.config({
    name        : 'pomodoro',
    storeName   : 'pomodoro',
  })

  $uiViewScrollProvider.useAnchorScroll()

  $compileProvider.debugInfoEnabled(constants.production)

  var urlMatcherGenericOptions = {
    encode: encodeDecode,
    decode: encodeDecode,
    is: matchesPattern
  }

  $urlMatcherFactoryProvider.type('dayFormat',
    angular.extend(urlMatcherGenericOptions,{
      pattern: /^\/\d{1,2}\/\d{1,2}\/\d{4}|.*/
    })
  )

  $urlMatcherFactoryProvider.type('weekFormat',
    angular.extend(urlMatcherGenericOptions,{
      pattern: /^\/\d{1,2}\/\d{4}|.*/
    })
  )

  function encodeDecode(val){ return val ? val.toString() : val }
  function matchesPattern(val) { return this.pattern.test(val) }
})
