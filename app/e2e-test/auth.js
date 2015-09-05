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
      .assert.attributeContains('.user-profile img', 'src', 'https://avatars.githubusercontent.com/u/2662706?v=3')
  },
  'does not show login prompt': function(browser){
    browser
      .url('https://pomodoro.dev/statistics')
      .assert.elementNotPresent('.login-logout.big')
  },
  'user can log out': function(browser){
    // browser
    //   .url('https://pomodoro.dev/')
    //   .click('#logout-link')
    //   .assert.containsText('.login-logout .logout', 'Signup or login with')
  },
}
