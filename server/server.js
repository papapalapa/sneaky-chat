const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer((app));
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome!'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', generateMessage(message.from, message.text))
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('From the server');
	});

	socket.on('createLocationMessage', coords => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	})

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});


server.listen(port, err => {
	if (err) {
		console.log(err);
	}

	console.log(`Server started on port ${port}`);
	
})