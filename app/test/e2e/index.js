module.exports = {
  beforeEach: function(browser){
    browser
      .url("http://localhost:9000")
      .waitForElementVisible('main', 1000)
  },
  "As a user\
  I want to be able to start a pomodoro\
  So that I can keep track of my time spent on a specific task": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:first-child')
      .assert.containsText('.timer', '25:00')
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
