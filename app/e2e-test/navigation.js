module.exports = {
  after: function(browser){
    browser.end()
  },
  "navigate in statistics page": function(browser){
    var today = getToday()
    var previousDay = getYesterday()
    var nextDay = getTomorrow()
    browser
      .url('https://pomodoro.dev/statistics')
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
  // "navigates to blog": function(browser){
  //   browser
  //     .url('https://pomodoro.dev/blog/')
  //     .assert.containsText('body', 'Pomodoro.cc Tech Blog')
  // },
  "clicks to buttons and navigates to page": function(browser){
    browser
      .url('https://pomodoro.dev/')
      .click('#statistics-link')
      .assert.containsText('main', 'to see your statistics')
      .pause(1000)
      .url('https://pomodoro.dev/')
      .waitForElementVisible('body', 5000)
      .click('#blog-link')
      .assert.containsText('body', 'Pomodoro.cc Tech Blog')
      .pause(1000)
      .url('https://pomodoro.dev/')
      .click('#about-link')
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
