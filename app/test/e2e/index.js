var moment = require('moment')
var constants = require('../../src/constants')

module.exports = {
  beforeEach: function(browser){
    browser
      .url('https://pomodoro.dev')
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
      .assert.containsText('main', 'Login with')
  },
  "navigate in statistics page": function(browser){
    var today = getToday()
    var previousDay = getYesterday()
    var nextDay = getTomorrow()
    browser
      .click('.grid-menu a:nth-child(1)')
      .assert.containsText('main', 'Statistics')
      .click('.ion-ios-arrow-back')
      .assert.containsText('main', previousDay)
      .click('.ion-ios-arrow-forward')
      .assert.containsText('main', today)
      .click('.ion-ios-arrow-forward')
      .assert.containsText('main', nextDay)
  }
}

function getToday(){
  var date = new Date()
  var day = pad(date.getDate())
  var month = pad((date.getMonth()+1))
  var year = date.getFullYear()
  return day + '/' + month + '/' + year
}

function getYesterday(){
  var date = new Date()
  date.setDate(date.getDate()-1)
  var day = pad(date.getDate())
  var month = pad((date.getMonth()+1))
  var year = date.getFullYear()
  return day + '/' + month + '/' + year
}

function getTomorrow(){
  var date = new Date()
  date.setDate(date.getDate()+1)
  var day = pad(date.getDate())
  var month = pad((date.getMonth()+1))
  var year = date.getFullYear()
  return day + '/' + month + '/' + year
}

function pad(number){
  return number < 10 ? '0'+number : number
}
