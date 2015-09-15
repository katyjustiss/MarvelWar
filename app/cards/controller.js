"use strict"

var Card = require('./Cards');

module.exports.index = function (req, res){
  Card.findAll (function (err, cards){
    if (err) throw err;
    res.format ({
      html: function () {
        res.render('cards/index', {cards: cards});
      },
      json: function () {
        res.send({cards : cards});
      }
    });
  });

};

