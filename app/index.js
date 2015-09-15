'use strict'

var express = require('express');
var routes = require('./routes');

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.locals.title = 'MarvelWar';

app.use(express.static('www'));

app.use('/', routes);

startNodeListener();

function startNodeListener() {
  var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    var mode = app.get('env');

    console.log(`Server listening on port ${port} in ${mode} mode...`);
  });
};
