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
  trello: {
    key: '7d05f76e2da759f5ebbce17eca157000',
    return_url: '{host}/trello',
    name: 'Pomodoro.cc',
    scope: 'read',
    expiration: 'never',
    authTemplateString: 'https://trello.com/1/authorize?key={key}&name={name}&scope={scope}&expiration={expiration}&return_url={return_url}'
  }
})
