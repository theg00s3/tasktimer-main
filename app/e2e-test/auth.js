module.exports = {
  after: function(browser){
    browser.end()
  },
  before: function (browser) {
    browser
      .url('https://pomodoro.dev/auth/fake')
  },
  'shows user information in the header': function(browser){
    browser
      .url('https://pomodoro.dev/')
      .assert.attributeContains('.user-profile', 'src', 'https://avatars.githubusercontent.com/u/2662706?v=3')
  },
  'does not show login prompt': function(browser){
    browser
      .url('https://pomodoro.dev/statistics')
      .assert.elementNotPresent('.login-logout.big')
  },
  'shows statistcs for the selected day': function(browser){
    browser
      .url('https://pomodoro.dev/statistics?day=07/12/2015')
      .assert.elementPresent('.timeline-container')
  },
}
