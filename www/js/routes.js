angular
  .module('MarvelWar')

  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/partials/card.html',
        controller: 'CardCtrl',
        controllerAs: 'card'
      })
      .when('/game', {
        templateUrl: '/views/partials/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .otherwise({redirectTo:'/'});
  });
