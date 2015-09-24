angular
  .module('MarvelWar')

  .controller('CardCtrl', function ($http, $scope, $modal, $timeout, MarvelTeam, GetCards) {
      var vm = this;
      var team = [];
      $scope.team = [];

      GetCards.then(function(res) {
          vm.data = res.cards;
      })

      $scope.open = function (oneCard) {
        $scope.oneCard = oneCard;
        var modalInstance = $modal.open({
          templateUrl: './views/partials/modal.html',
          controller: 'ModalInstanceCtrl',
          scope: $scope
        });

        modalInstance.result.then(function () {
          team.push(oneCard);
          MarvelTeam.setUserTeam(team);
          $scope.team = team;
          if (team.length === 5) {
            $('.play_btn').css('visibility', 'visible');
          }
        })
      }

      $scope.removeCard = function(cardIndex) {
        $scope.team.splice(cardIndex, 1);
      }

        //Carousel options
      $scope.slickConfig = {
        autoplay: true,
        infinite: true,
        draggable: false,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        slidesToShow: 5,
        slidesToScroll: 3,
        //rows: 2,
        method: {},
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

  });

