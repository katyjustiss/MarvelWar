angular
  .module('MarvelWar')

  .factory('GetCards', function($http, $q) {
    var promise = $http.get('https://marvel-api.herokuapp.com/api/cards').then(function(res) {
      return res.data;
    });

    return promise;

  })
