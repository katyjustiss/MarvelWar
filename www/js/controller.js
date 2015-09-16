angular
  .module('MarvelWar')

  .controller('CardCtrl', function ($http, $scope) {
      var card = this;

        $http
          .get('/')
          .success(function (res) {
            console.log(res)
            card.data = res.cards;
          });


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

  // .controller('GameCtrl', function ($http) {
  //     var card = this;

  //     $http
  //       .get('/game')
  //       // .success(function (res) {
  //       //   console.log(res)
  //       //   card.data = res.cards;
  //       // });

  //   });

