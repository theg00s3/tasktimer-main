module.exports = {
  after: function(browser){
    browser.end()
  },
  "adds changes color of header when navigated to statistics page": function(browser){
    browser
      .url('https://pomodoro.dev/statistics')
      .assert.attributeContains('main header', 'class', 'prominent-header')


      .url('https://pomodoro.dev/about')
      .assert.attributeContains('main header', 'class', 'prominent-header')
  },
  "navigate in statistics page": function(browser){
    var today = getToday()
    var previousDay = getYesterday()
    var nextDay = getTomorrow()
    browser
      .url('https://pomodoro.dev/statistics')
      .assert.containsText('main', 'Statistics')
      .click('.ion-ios-arrow-back')
      .assert.containsText('main', previousDay)
      .click('.ion-ios-arrow-forward')
      .assert.containsText('main', today)
      .click('.ion-ios-arrow-forward')
      .assert.containsText('main', nextDay)
  },
  "navigates to about page": function(browser){
    browser
      .url('https://pomodoro.dev/about')
      .assert.containsText('main', 'Manage your time more effectively')
  },
  "navigates to blog": function(browser){
    browser
      .url('https://pomodoro.dev/blog')
      .assert.containsText('body', 'Pomodoro.cc Tech Blog')
  },
  "clicks to buttons and navigates to page": function(browser){
    browser
      .url('https://pomodoro.dev/')
      .click('#main-header .menu li:nth-child(1)')
      .assert.containsText('main', 'Statistics')
    browser
      .url('https://pomodoro.dev/')
      .click('#main-header .menu li:nth-child(2)')
      .assert.containsText('body', 'Pomodoro.cc Tech Blog')
    browser
      .url('https://pomodoro.dev/')
      .click('#main-header .menu li:nth-child(3)')
      .assert.containsText('main', 'Manage your time more effectively')
  }
}

function getToday(){
  var date = new Date()
  var day = pad(date.getDate())
  var month = pad((date.getMonth()+1))
  var year = date.getFullYear()
  return month + '/' + day + '/' + year
}

function getYesterday(){
  var date = new Date()
  date.setDate(date.getDate()-1)
  var day = pad(date.getDate())
  var month = pad((date.getMonth()+1))
  var year = date.getFullYear()
  return month + '/' + day + '/' + year
}

function getTomorrow(){
  var date = new Date()
  date.setDate(date.getDate()+1)
  var day = pad(date.getDate())
  var month = pad((date.getMonth()+1))
  var year = date.getFullYear()
  return month + '/' + day + '/' + year
}

function pad(number){
  return number < 10 ? '0'+number : number
}
