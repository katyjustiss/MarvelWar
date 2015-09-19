angular
  .module('MarvelWar')

  .controller('CardCtrl', function ($http, $scope, $modal) {
      var card = this;
      var team = [];
      var compTeam = [];

        $http
          .get('http://localhost:5000/api/cards')
          .success(function (res) {
            card.data = res.cards;
            console.log(card.data);
        });

      $scope.open = function (oneCard) {
        console.log(oneCard)
        $scope.oneCard = oneCard;
        var modalInstance = $modal.open({
          templateUrl: './modal.html',
          controller: 'ModalInstanceCtrl',
          scope: $scope
          // resolve: {
          //   oneCard: function() {
          //     return $scope.oneCard;
          //   }
          // }
        });
      }


        //Carousel options
      $scope.slickConfig = {
        autoplay: true,
        infinite: true,
        draggable: false,
        autoplaySpeed: 3000,
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

