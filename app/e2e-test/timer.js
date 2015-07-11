module.exports = {
  beforeEach: function(browser){
    browser
      .url('https://pomodoro.dev')
      .waitForElementVisible('main', 1000)
  },
  after: function(browser){
    browser.end()
  },
  "refreshing the browser retains state": function(browser){
    browser
      .click('.control-buttons-container button:first-child')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .refresh()
      .pause(1500)
      .getText('.timer', containsRegExp(/24:\d\d/))
      .click('.control-buttons-container button:first-child')
  },
  "start a pomodoro": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:first-child')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .click('.control-buttons-container button:first-child')
      .assert.containsText('.timer', '00:00')
  },
  "start a break": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(2)')
      .getText('.timer', containsRegExp(/0[45]:\d\d/))
      .click('.control-buttons-container button:nth-child(2)')
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(3)')
      .getText('.timer', containsRegExp(/1[45]:\d\d/))
      .click('.control-buttons-container button:nth-child(3)')
      .assert.containsText('.timer', '00:00')
  },
  "can see the remaining time in the title": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(1)')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .getTitle(function(title) {
        this.assert.ok(/2[45]:\d\d/.test(title))
      })
      .click('.control-buttons-container button:nth-child(1)')
      .assert.containsText('.timer', '00:00')
      .getTitle(function(title) {
        this.assert.ok(/Pomodoro\.cc/.test(title))
      })
  },
}


function containsRegExp(regexp){
  return function(result){
    var text = result.value
    if( !text )return
    this.assert.ok(regexp.test(text))
  }
}
