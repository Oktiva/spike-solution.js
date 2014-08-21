var express = require('express');
var app = express();
var http = require('http').Server(app);
var chat = require('./chat')(http);

// Routes and assets
app.use(express.static(__dirname + '/../client/'));

// start http server listening on 8080
http.listen(8080);

