module.exports = {
  beforeEach: function(browser){
    browser
      .url("http://localhost:9000")
      .waitForElementVisible('main', 1000)
  },
  "refreshing the browser retains state": function(browser){
    browser
      .click('.control-buttons-container button:first-child')
      .assert.containsText('.timer', '25:00')
      .refresh()
      .pause(1000)
      .getText('.timer', function(result){
        var text = result.value
        this.assert.ok(/24:\d\d/.test(text))
      })
      // .assert.containsText('.timer', '24:58')
      .click('.control-buttons-container button:first-child')
  },
  "start a pomodoro": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:first-child')
      .assert.containsText('.timer', '25:00')
      .click('.control-buttons-container button:first-child')
      .assert.containsText('.timer', '00:00')
  },
  "start a break": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(2)')
      .assert.containsText('.timer', '05:00')
      .click('.control-buttons-container button:nth-child(2)')
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(3)')
      .assert.containsText('.timer', '15:00')
      .click('.control-buttons-container button:nth-child(3)')
      .assert.containsText('.timer', '00:00')
  },
  "navigate to about page": function(browser){
    browser
      .click('.grid-menu a:nth-child(2)')
      .assert.containsText('main', 'Boost your productivity')
  },
  "navigate to statistics page": function(browser){
    browser
      .click('.grid-menu a:nth-child(1)')
      .assert.containsText('main', 'Statistics')
      .assert.containsText('main', 'Unauthorized')
  }
}
