module.exports = {
  after: function(browser){
    browser.end()
  },
  before: function (browser) {
    browser
      .url('https://pomodoro.dev/auth/fake')
  },
  'shows user information if logged in': function(browser){
    browser
      .url('https://pomodoro.dev/')
      .assert.attributeContains('.user-profile', 'src', 'https://avatars.githubusercontent.com/u/2662706?v=3')
  },
  'show statistics to the logged in user': function(browser){
    browser
      .url('https://pomodoro.dev/statistics')
      .assert.elementNotPresent('.login-logout.big')
  }
}
