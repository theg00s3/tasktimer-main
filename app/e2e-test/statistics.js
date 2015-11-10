module.exports = {
  after: function(browser){
    browser.end()
  },
  before: function (browser) {
    browser
      .url('https://pomodoro.dev/auth/fake')
  },
  'shows statistcs for the selected day': function(browser){
    /*
    browser
      .url('https://pomodoro.dev/statistics?day=07/12/2015')
      .assert.elementPresent('.timeline-container')
    */
  },
  'shows information for no data for day': function(browser){
    browser
      .url('https://pomodoro.dev/statistics?day=07/13/2020')
      .assert.elementNotPresent('.timeline-container')
      .assert.containsText('.statistics-content .content', 'Your statistics')
  },
}
