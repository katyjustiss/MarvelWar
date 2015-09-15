angular
  .module('MarvelWar')

  .controller('CardCtrl', function ($http, $scope) {
      var card = this;

      $http
        .get('/')
        .success(function (res) {
          console.log(res)
          card.data = res.cards;
           $scope.$apply();
        });

    })

  // .controller('GameCtrl', function ($http) {
  //     var card = this;

  //     $http
  //       .get('/game')
  //       // .success(function (res) {
  //       //   console.log(res)
  //       //   card.data = res.cards;
  //       // });

  //   });

