var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message Arrived', message);
    $('<li class="sent"><p>' + message.text +
        '</p></li>').appendTo($('.messages ul'));
    $('.contact.active .preview').html(`<span>${message.from}</span>` + message.text);
    $(".messages").animate({
        scrollTop: $(document).height()
    }, "fast");
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery(`<a target="_blank">My current location</a>`)

    li.text(`${message.from}:`);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
})

jQuery('.submit').on('click', function (e) {
    sendMessage();
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        console.log(position);
    }, function () {
        alert('Unable to fetch location.');
    })
})

// Emits createMessage
function sendMessage () {
    message = $(".message-input input").val();
    if ($.trim(message) == '') {
        return false;
    }

    $('<li class="replies"><p>' + message +
        '</p></li>').appendTo($('.messages ul'));
    $('.contact.active .preview').html('<span>You: </span>' + message);
    $(".messages").animate({
        scrollTop: $(document).height()
    }, "fast");

    socket.emit('createMessage', {
        'from': 'User',
        'text': jQuery('[name=message]').val()
    }, function () {

    });

    $('.message-input input').val(null);
}

$(window).on('keydown', function (e) {
    if (e.which == 13) {
        sendMessage();
        return false;
    }
});