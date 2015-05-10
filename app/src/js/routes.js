angular.module('app')
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/',
      controller: 'DashboardCtrl as vm',
      templateUrl: 'dashboard/index.html',
    })
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl as vm',
      templateUrl: 'login.html',
    })
    .state('public', {
      abstract: true,
      url: '/public',
      template:'<ui-view/>'
    })
      .state('public.choose', {
        url: '',
        controller: 'PublicChooseCtrl as vm',
        templateUrl: 'public-choose.html',
      })
      .state('public.room', {
        url: '/:id',
        controller: 'PublicCtrl as vm',
        templateUrl: 'public.html',
      })
    .state('statistics', authenticate({
      url: '/statistics',
      templateUrl: 'statistics/layout.html',
      abstract: true
    }))
      .state('statistics.daily', {
        url: '/daily/{day:dayFormat}',
        controller: 'StatisticsDailyCtrl as vm',
        templateUrl: 'statistics/daily.html',
      })
      .state('statistics.weekly', {
        url: '/weekly/{week:weekFormat}',
        controller: 'StatisticsWeeklyCtrl as vm',
        templateUrl: 'statistics/weekly.html',
      })
      .state('statistics.global', {
        url: '/global',
        controller: 'StatisticsGlobalCtrl as vm',
        templateUrl: 'statistics/global.html',
      })
    .state('about', {
      url: '/about',
      controller: 'AboutCtrl as vm',
      templateUrl: 'about.html',
    })
    .state('trello', {
      url: '/trello',
      controller: 'TrelloGrantCtrl as vm',
      templateUrl: 'trello.html',
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsCtrl as vm',
      templateUrl: 'settings.html',
    })



  $urlRouterProvider.otherwise('/')
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })


  function authenticate(config){
    return angular.extend(config, {
      resolve: {
        user: function($location,User){
          console.log( $location.$$path )
          if( /^\/statistics\/global/.test($location.$$path) ){
            return true
          }
          return User.authenticate()
        }
      }
    })
  }

})
