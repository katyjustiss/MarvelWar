'use strict';
var express = require('express');
var router = express.Router();

var ctrl = require('./controller');
router.get('/', ctrl.index);

router.get('/game', function (req, res) {
   res.render('templates/game')
})

module.exports = router;
