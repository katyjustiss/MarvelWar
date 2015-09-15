angular
  .module('MarvelWar')

  .controller('CardCtrl', function ($http) {
      var card = this;

      $http
        .get('/')
        .success(function (res) {
          console.log(res)
          card.data = res.cards;
        });

    });
