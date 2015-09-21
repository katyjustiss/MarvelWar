angular
  .module('MarvelWar')

  .factory('GetCards', function($http) {
    return {
      getAll(cb) {
        $http
          .get('http://localhost:5000/api/cards')
          .success(cb)
      }
    }
  })
