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
      .assert.containsText('.timer', '24:58')
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

  // "As a user\
  // I want to be able to continue editing the text\
  // That I was writing during the session before": function(browser){
  //   browser
  //     .clearValue('textarea')
  //     .setValue('textarea', '# marked\n##down')
  //     .pause(100)
  //     .assert.containsText('#rendered', 'marked\ndown')

  //     .url("http://localhost:9000?test")
  //     .waitForElementVisible('zen-editor', 1000)
  //     .pause(100)
  //     .assert.containsText('#rendered', 'marked\ndown')
  //     .end()
  // }
}
