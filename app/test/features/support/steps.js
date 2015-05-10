var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);

var expect = chai.expect;


module.exports = function() {
  this.Given(/^I go to "([^"]*)"$/, function(url, next) {
    browser.get('http://localhost:9000' + url);
    next();
  });

  this.Given(/^I click on "([^"]*)"$/, clickOnHandler);

  this.Then( /^I click on "([^"]*)"$/, clickOnHandler);

  this.Then(/^I should be able to stop the timer "([^"]*)"$/, function (selector, callback) {
    clickOn(selector);
    browser.switchTo().alert().accept().then(callback)
  });

  this.Then(/^I should see an alert$/, function (selector, callback) {
    browser.switchTo().alert().accept().then(callback);
  });

  this.Then(/^I should be able to insert a tag$/, function (callback) {
    element(by.model('vm.newTag')).isPresent().then(function(present){
      expect(present).to.be.true();
      callback();
    })
  });

  this.When(/^I insert the tag "([^"]*)"$/, function (tagName, callback) {
    var tagInput = element(by.model('vm.newTag'));
    tagInput.sendKeys(tagName, protractor.Key.ENTER).then(function(){
      tagInput.getText().then(function(text){
        expect(text).to.equal('');
        var tags = element.all(by.css('.tags li'))
        tags.count().then(function(count){
          expect(count).to.equal(2);
          callback();
        })
      })
    })
  });

  this.When(/^I insert the public room "([^"]*)"$/, function (room, callback) {
    var roomInput = element(by.model('vm.room'));
    roomInput.sendKeys(room, protractor.Key.ENTER).then(callback)
  });

  this.Then(/^I should see "([^"]*)"$/, function (content, next) {
    assertPageContains(content,next);
  });

  this.Then(/^I should be on "([^"]*)"$/, function (url, next) {
    assertUrl(url,next);
  });


  function clickOnHandler(selector,next){
    clickOn(selector);
    next();
  }

  function assertPageContains(content,next){
    browser.getPageSource().then(function(source){
      expect(source).to.contain(content);
      next();
    });
  }



  function clickOn(selector) {
    element(by.css(selector)).click();
  }

  function assertUrl(url,callback){
    browser.getLocationAbsUrl().then(function(currentUrl){
      expect(currentUrl).to.match(new RegExp(url));
      callback();
    });
  }
};
