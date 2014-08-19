var _ = require('lodash');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chat = io.of('/chat');

app.use(express.static(__dirname + '/../client/'));

http.listen(8080);

// sockets events
var getPeopleList = function () {
    var peopleList = [];

    _.each(chat.sockets, function (socket) {
        peopleList.push( _.pick(socket, ['id']) );
    });

    return peopleList;
};

chat.on('connection', function (socket) {
    chat.emit('update:people-list', getPeopleList());

    socket.on('disconnect', function () {
        chat.emit('update:people-list', getPeopleList());
    });

    socket.on('send:message', function (message) {
        chat.emit('update:message-list', message);
    });
});

