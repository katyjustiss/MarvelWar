angular
  .module('MarvelWar')

  .factory("MarvelTeam", function() {
    var teamObj = {};

      teamObj.marvelTeam = [];

      teamObj.setUserTeam = function(userTeam) {
        this.marvelTeam = userTeam;
      }
      teamObj.getMyTeam = function() {
        var userCards = this.marvelTeam;
         return this.marvelTeam;
      }
      return teamObj;
  })
