module.exports = {
  beforeEach: function(browser){
    browser
      .url('https://pomodoro.dev')
      .waitForElementVisible('main', 1000)
  },
  after: function(browser){
    browser.end()
  },
  "shares tweet": function(browser){
    browser
      .click('.twitter-share')
      .pause(5000)
      .getText('body', containsRegExp(/#productivity/))
  },
}


function containsRegExp(regexp){
  return function(result){
    var text = result.value
    if( !text )return
    this.assert.ok(regexp.test(text))
  }
}
