angular
  .module('MarvelWar')

  .controller('GameCtrl', function ($http, $scope, MarvelTeam) {
    var vm = this;



    vm.getMyTeam = MarvelTeam.getMyTeam()

    // vm.getMyTeam = [
    //   { characterid: 2,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b/portrait_incredible.jpg",
    //     name: "Spider-Man"
    //   },
    //   { characterid: 4,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d/portrait_incredible.jpg",
    //     name: "Storm"
    //   },
    //   { characterid: 7,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/3/10/5112d84e2166c/portrait_incredible.jpg",
    //     name: "Rogue"
    //   }
    // ]



  });
