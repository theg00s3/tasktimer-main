var moment = require('moment')
var constants = require('../src/constants')

module.exports = {
  beforeEach: function(browser){
    browser
      .url('https://pomodoro.dev')
      .waitForElementVisible('main', 1000)
  },
  after: function(browser){
    browser.end()
  },
  "trolling is ok": function(browser){
    browser
      .click('.control-buttons-container button:first-child')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .click('.control-buttons-container button:first-child')
      .click('.control-buttons-container button:nth-child(2)')
      .getText('.timer', containsRegExp(/0[45]:\d\d/))
      .click('.control-buttons-container button:nth-child(2)')
      .click('.control-buttons-container button:nth-child(3)')
      .getText('.timer', containsRegExp(/1[45]:\d\d/))
      .click('.control-buttons-container button:nth-child(3)')
  },
  "refreshing the browser retains state": function(browser){
    browser
      .click('.control-buttons-container button:first-child')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .refresh()
      .pause(1500)
      .getText('.timer', containsRegExp(/24:\d\d/))
      .click('.control-buttons-container button:first-child')
  },
  "start a pomodoro": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:first-child')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .click('.control-buttons-container button:first-child')
      .assert.containsText('.timer', '00:00')
  },
  "start a break": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(2)')
      .getText('.timer', containsRegExp(/0[45]:\d\d/))
      .click('.control-buttons-container button:nth-child(2)')
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(3)')
      .getText('.timer', containsRegExp(/1[45]:\d\d/))
      .click('.control-buttons-container button:nth-child(3)')
      .assert.containsText('.timer', '00:00')
  },
  "can see the remaining time in the title": function(browser){
    browser
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(1)')
      .getText('.timer', containsRegExp(/2[45]:\d\d/))
      .getTitle(function(title) {
        this.assert.ok(/2[45]:\d\d/.test(title))
      })
      .click('.control-buttons-container button:nth-child(1)')
      .assert.containsText('.timer', '00:00')
      .getTitle(function(title) {
        this.assert.ok(/Pomodoro\.cc/.test(title))
      })
      
      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(2)')
      .getText('.timer', containsRegExp(/0[45]:\d\d/))
      .getTitle(function(title) {
        this.assert.ok(/0[45]:\d\d/.test(title))
      })
      .click('.control-buttons-container button:nth-child(2)')
      .assert.containsText('.timer', '00:00')
      .getTitle(function(title) {
        this.assert.ok(/Pomodoro\.cc/.test(title))
      })

      .assert.containsText('.timer', '00:00')
      .click('.control-buttons-container button:nth-child(3)')
      .getText('.timer', containsRegExp(/1[45]:\d\d/))
      .getTitle(function(title) {
        this.assert.ok(/1[45]:\d\d/.test(title))
      })
      .click('.control-buttons-container button:nth-child(3)')
      .assert.containsText('.timer', '00:00')
      .getTitle(function(title) {
        this.assert.ok(/Pomodoro\.cc/.test(title))
      })
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


function containsRegExp(regexp){
  return function(result){
    var text = result.value
    if( !text )return
    console.log( 'TESTING REGEXP', text, regexp)
    this.assert.ok(regexp.test(text))
  }
}
