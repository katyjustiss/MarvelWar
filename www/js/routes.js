angular
  .module('MarvelWar')

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/partials/card.html',
        controller: 'CardCtrl'
      })
      .when('/game', {
        templateUrl: '/views/partials/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({redirectTo:'/'});
  });
