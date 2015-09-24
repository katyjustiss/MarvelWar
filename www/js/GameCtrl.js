angular
  .module('MarvelWar')

  .controller('GameCtrl', function ($scope, $timeout, MarvelTeam, GetCards) {
    var vm = this;
    vm.data = [];
    vm.score = 0;
    vm.compScore = 0;
    vm.turn = 0;

    var randomThree = randomNum(0, 4);
    var randomArr = randomNum(0, 32);

    GetCards.then(function(res) {
      randomArr.forEach(function(random) {
        if (res.cards[random]) {
          return vm.data.push(res.cards[random])
        }
      })
    })

    //vm.getMyTeam = MarvelTeam.getMyTeam()
    vm.getMyTeam = [
      { characterid: 2,
        image: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b/portrait_incredible.jpg",
        name: "Spider-Man",
        attack: 6,
        defense: 5
      },
      { characterid: 4,
        image: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d/portrait_incredible.jpg",
        name: "Storm",
        attack: 6,
        defense: 6
      },
      { characterid: 7,
        image: "http://i.annihil.us/u/prod/marvel/i/mg/3/10/5112d84e2166c/portrait_incredible.jpg",
        name: "Rogue",
        attack: 5,
        defense: 7
      },
      { characterid: 21,
        image: "http://i.annihil.us/u/prod/marvel/i/mg/5/c0/528d340442cca/portrait_incredible.jpg",
        name: "Juggernaut",
        attack: 6,
        defense: 8
      },
      { characterid: 30,
        image: "http://i.annihil.us/u/prod/marvel/i/mg/1/50/526961ce86539/portrait_incredible.jpg",
        name: "Psylocke",
        attack: 7,
        defense: 7
      }
    ]

    //starting game after card click.
    vm.startGame = function (card) {
      $scope.isDisabled = true;
      vm.turn++;
      playerTurn(card);
      computerTurn(vm.data);
      $timeout(function() {
        calculateScore(getIndex);
      }, 2000);
    }

    function Game() {
      playerTurn(card);
      computerTurn(vm.data);
      $timeout(function() {
        calculateScore(getIndex);
      }, 2000);
    }

    function calculateScore(cb) {
      var compStats = vm.compStats;
      var stats = vm.stats;
      var total = compStats + stats;
      console.log(stats);
      console.log(compStats)
      $scope.show = true;

      if (compStats/total === stats/total) {
        var random = Math.random();
        if (random > .49) {
          vm.compScore++
          addAlert({msg: "You almost had 'em"})
        } else {
          vm.score++
          addAlert({msg: 'Close Call'})
        }
      } else if(stats/total > compStats/total) {
        addAlert({msg: 'You win this round'})
        vm.score++;
      } else {
        vm.compScore++;
        addAlert({msg: 'You were outmatched'})
      }
      $timeout(function() {
        cb(finish);
      }, 2000);
    }

    function finish() {
      if (vm.score >= 3) {
        addAlert({msg: 'CONGRATULATIONS! YOU SAVED THE WORLD'})
        $scope.isDisabled = true;
      } else if (vm.compScore >= 3) {
        addAlert({msg: 'GAME OVER'})
        $scope.isDisabled = true;
      }
    }

    vm.removeCard = {};
    vm.removeCompCard = {};
    //Removing Cards
    function getIndex(cb) {
      var index = vm.getMyTeam.indexOf(vm.playedCard)
      var compIndex = vm.data.indexOf(vm.currentCompCard)
      removePlayersCard(index);
      removeComputerCard(compIndex);
      $scope.isDisabled = false;
      cb()
    }

    function removePlayersCard(index) {
      if(vm.removeCard[index]) {
        vm.removeCard[index] = false;
      } else if (vm.removeCard[index] = false) {
        vm.removeCard[index] = false;
      } else {
        vm.removeCard[index] = true;
      }
    }

    function removeComputerCard(compIndex) {
      if(vm.removeCompCard[compIndex]) {
        vm.removeCompCard[compIndex] = false;
      } else if (vm.removeCompCard[compIndex] = false) {
        vm.removeCompCard[compIndex] = false;
      } else {
        vm.removeCompCard[compIndex] = true;
      }
    }


    //Player Turn
    function playerTurn(card) {
      var index = vm.getMyTeam.indexOf(card)
      moveCard(index)
      vm.playedCard = card
      vm.stats = attackDefense(vm.playedCard);
    }

    //Computer Turn
    function computerTurn() {
      var random = randomThree.shift();
      console.log(random);
      vm.currentCompCard = vm.data[random]
      var current = vm.data[random]
      vm.compStats = attackDefense(vm.currentCompCard);
      moveCompCard(random);
    }

    //Card Movement functions
    function moveCompCard(random) {
      $timeout(function() {
      vm.compCard = {};
        if(vm.compCard[random]) {
          vm.compCard[random] = false;
        } else {
          vm.compCard[random] = true;
        }
      }, 500);
    }

    function moveCard(index) {
      vm.selectedCard = {};
      if(vm.selectedCard[index]) {
        vm.selectedCard[index] = false;
      } else {
        vm.selectedCard[index] = true;
      }
    }

    //Attack and defense calculation
    function attackDefense(card) {
      var attack = card.attack;
      var defense = card.defense;
      var combined = attack + defense;
      var min = 0.5;
      var max = 3.5;
      combined = Math.round(combined + (1 + Math.random(min, max)));
      return combined;
    };


    function addAlert(message) {
      vm.alerts = message;
    }

    vm.closeAlert = function(index) {
      $scope.show = false;
      vm.alerts = [];
    }


    //Random numbers utility functions
    function randomNum(low, high) {
      var randomArr = [];
      while(randomArr.length < 5) {
        var random = randomInt(low, high);
          if(randomArr.indexOf(random) == -1){
            randomArr.push(random)
          }
        }
        return randomArr
      }


    function randomInt (low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low);
    }


  });
