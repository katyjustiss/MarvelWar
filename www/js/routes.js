angular
  .module('MarvelWar')

  .config(function($routeProvider) {
    // $urlRouterProvider.when('', '/');
    // $urlRouterProvider.otherwise('/');
    console.log('routes');
    $routeProvider
      .when('/', {
        templateURL: '/index',
        controller: 'CardCtrl'
      })
      .when('/game', {
        templateURL: '/game',
        controller: 'CardCtrl'
      })
      .otherwise({redirectTo:'/'});
  });
