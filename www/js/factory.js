angular
  .module('MarvelWar')

  .factory("MarvelTeam", function() {
    var teamObj = {};

      teamObj.marvelTeam = [];

      teamObj.setUserTeam = function(userTeam) {
        console.log(userTeam)
        this.marvelTeam = userTeam;
      }
      teamObj.getMyTeam = function() {
        var userCards = this.marvelTeam;
        console.log(userCards)
         return this.marvelTeam;
      }
      return teamObj;
  })
