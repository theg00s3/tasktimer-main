angular.module('app')
.constant('constants', {
  build: '{build}',
  production: angular.fromJson('{production}'),
  dateFormat:'DD/MM/YYYY',
  readableDateFormat:'dddd, DD/MM/YYYY',
  weekFormat:'W/GGGG',
  tagsLimit: 5,
  pageTitle: 'Pomodoro.cc',
  pomodoroAPIBaseUrl: '{host}',
  host: '{host}',
  notificationDismissTimeout: 3000,
  version: angular.version.full,
})
