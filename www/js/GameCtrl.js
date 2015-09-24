angular
  .module('MarvelWar')

  .controller('GameCtrl', function ($scope, $timeout, $rootScope, $location, MarvelTeam, GetCards) {
    var vm = this;
    vm.data = [];
    vm.score = 0;
    vm.compScore = 0;
    vm.turn = 0;

    var randomThree = randomNum(0, 4);
    var randomArr = randomNum(0, 32);

    GetCards.then(function(res) {
      randomArr.forEach(function(random) {
        if (!res.cards[random]) {
          random < 32 ? random + 1 : random - 1;
        }
        return vm.data.push(res.cards[random])
      })
    })

    vm.getMyTeam = MarvelTeam.getMyTeam()

    //START GAME after card click.
    vm.startGame = function (card) {
      vm.isDisabled = true;
      vm.turn++;
      playerTurn(card);
      computerTurn(vm.data);
      $timeout(function() {
        calculateScore(getIndex);
      }, 2000);
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
      vm.currentCompCard = vm.data[random]
      var current = vm.data[random]
      vm.compStats = attackDefense(vm.currentCompCard);
      moveCompCard(random);
    }

    function calculateScore(cb) {
      var compStats = vm.compStats;
      var stats = vm.stats;
      var total = compStats + stats;

      if (compStats/total === stats/total) {
        var random = Math.random();
        if (random > .49) {
          vm.compScore++
          addAlert({msg: "POW! You almost had 'em"})
        } else {
          vm.score++
          addAlert({msg: 'Close call but you managed to pull out the win'})
        }
      } else if(stats/total > compStats/total) {
        addAlert({msg: 'Kapow! Round Winner!'})
        vm.score++;
      } else {
        vm.compScore++;
        addAlert({msg: 'KABOOOM! You were outmatched'})
      }
      $timeout(function() {
        cb(finish);
      }, 2000);
    }

    //DETEMINING WINNER
    function finish() {
      if (vm.score >= 3) {
        vm.turn = 'final';
        addAlert({msg: 'CONGRATULATIONS! YOU SAVED THE WORLD'})
        $('.smplay_btn').css('visibility', 'visible');
      } else if (vm.compScore >= 3) {
        vm.turn = 'final';
        addAlert({msg: 'GAME OVER'})
        $('.smplay_btn').css('visibility', 'visible');
      } else {
        vm.alerts = '';
      }
    }
    function showButton() {

    }

    vm.removeCard = {};
    vm.removeCompCard = {};
    //Removing Cards
    function getIndex(cb) {
      var index = vm.getMyTeam.indexOf(vm.playedCard)
      var compIndex = vm.data.indexOf(vm.currentCompCard)
      removePlayersCard(index);
      removeComputerCard(compIndex);
      vm.isDisabled = false;
      cb()
    }

    //REMOVE CARDS FROM SCREEN
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
      var min = 1.0;
      var max = 5.0;
      combined = Math.round(combined + (1 + Math.random(min, max)));
      return combined;
    };

    //ALERT FUNCTIONS
    function addAlert(message) {
      vm.alerts = message;
    }


    //GENERATING RANDOM NUMBERS
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

        // DUMMY DATA
    // vm.getMyTeam = [
    //   { characterid: 2,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b/portrait_incredible.jpg",
    //     name: "Spider-Man",
    //     attack: 6,
    //     defense: 5
    //   },
    //   { characterid: 4,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d/portrait_incredible.jpg",
    //     name: "Storm",
    //     attack: 6,
    //     defense: 6
    //   },
    //   { characterid: 7,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/3/10/5112d84e2166c/portrait_incredible.jpg",
    //     name: "Rogue",
    //     attack: 5,
    //     defense: 7
    //   },
    //   { characterid: 21,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/5/c0/528d340442cca/portrait_incredible.jpg",
    //     name: "Juggernaut",
    //     attack: 6,
    //     defense: 8
    //   },
    //   { characterid: 30,
    //     image: "http://i.annihil.us/u/prod/marvel/i/mg/1/50/526961ce86539/portrait_incredible.jpg",
    //     name: "Psylocke",
    //     attack: 7,
    //     defense: 7
    //   }
    // ]
  });
