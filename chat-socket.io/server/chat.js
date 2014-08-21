// Dependencies
var _  = require('lodash');
var io = require('socket.io');


// Exports
module.exports = Chat;


// Chat constructor
function Chat(httpServer, ioNamespace) {
    if (_.isUndefined(ioNamespace)) ioNamespace = 'chat';
    if (! (this instanceof Chat)) return new Chat(httpServer, ioNamespace);

    this.io = io(httpServer);
    this.conversation = this.io.of('/' + ioNamespace);
    this.bindEvents();
}

Chat.prototype.getPeopleList = function () {
    var that = this;
    var peopleList = [];

    _.each(that.conversation.sockets, function (socket) {
        peopleList.push( _.pick(socket, ['id']) );
    });

    return peopleList;
};

Chat.prototype.bindEvents = function () {
    var that = this;

    // When someone connects to the chat
    this.conversation.on('connection', function (socket) {
        // Then we send an update to the chat namespace
        that.conversation.emit('update:people-list', that.getPeopleList());

        // Also, when someone disconnects, we need to update the people list
        socket.on('disconnect', function () {
            that.conversation.emit('update:people-list', that.getPeopleList());
        });

        // when someone send a public message
        socket.on('send:message', function (message) {
            // We publish it to the people connected
            that.conversation.emit('update:message-list', message);
        });
    });
};

