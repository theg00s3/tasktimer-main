module.exports = {
  after: function(browser){
    browser.end()
  },
  'adds changes color of header when navigated to statistics page': function(browser){
    browser
      .url('https://pomodoro.dev/auth/fake')
      
    browser
      .assert.attributeContains('.user-profile', 'src', 'https://avatars.githubusercontent.com/u/2662706?v=3')
  },
}
