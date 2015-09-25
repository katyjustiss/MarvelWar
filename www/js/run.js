angular
  .module('MarvelWar')

  .run(function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, nextRoute) {
      if (!$rootScope.marvelTeam) {
        $location.path('/')
      }
    })
  })
