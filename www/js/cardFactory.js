angular
  .module('MarvelWar')

  .factory('GetCards', function($http, $q) {
    var promise = $http.get('http://localhost:5000/api/cards').then(function(res) {
      return res.data;
    });

    return promise;

  })
