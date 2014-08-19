var socket = io('/chat');

// Message list
var buildMessageHTML = function (message) {
    return $('' +
        '<div class="row">' +
            '<div class="col-sm-12">' +
                '<p class="btn btn-' + (message.author.id == socket.io.engine.id ? 'success pull-right' : 'default') + ' user-msg">' +
                    '<strong>' + (message.author.name || message.author.id) + ': </strong>' +
                    message.text +
                '</p>' +
            '</div>' +
        '</div>');
};

var updateMessageList = function (message) {
    console.log(arguments);
    $('.chat .message-list .well').append( buildMessageHTML(message) );
};

// Message sender
var configMessageSender = function (person) {
    var $messageSender = $('.message-sender');

    $messageSender.attr('data-author', person.id);
    $messageSender.on('click', '.send-message', function () {
        var $messageTxt = $messageSender.find('[name="message-text"]');
        var messageTxt = $messageTxt.val().trim();

        if (! messageTxt.length) return false;

        var message = {
            text: messageTxt,
            author: person
        };

        socket.emit('send:message', message);

        $messageTxt.val('');
    });
};

// People list
var buildPersonHTML = function (person) {
    var $person = $('<a href="#" class="list-group-item" />');
    $person.attr('data-person-id', person.id);
    $person.html( person.name || person.id );

    if (person.id == socket.io.engine.id) {
        configMessageSender(person);
        $person.append('<span class="label label-warning pull-right">me</span>');
    }

    return $person;
};

var updatePeopleList = function (people) {
    var peopleList = [];

    _.each(people, function (person) {
        peopleList.push( buildPersonHTML(person) );
    });

    $('.chat .people-list').html(peopleList);
};

// websockets events
socket.on('update:people-list', updatePeopleList);
socket.on('update:message-list', updateMessageList);
console.log(socket);

