module.exports = function(){
  ptor = protractor.getInstance();

  browser.addMockModule('app', function(){
    angular.module('app').service('landingPageRedirect',angular.noop);
  });
};
