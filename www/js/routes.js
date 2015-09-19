angular
  .module('MarvelWar')

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateURL: 'index.html',
        controller: 'CardCtrl'
      })
      .when('/game', {
        templateURL: 'game.html',
        controller: 'CardCtrl'
      })
      .otherwise({redirectTo:'/'});
  });
