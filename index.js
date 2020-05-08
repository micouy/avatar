var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.get('/', function(req, res){
  console.log("index");
  res.sendFile(__dirname + '/index.html');
  // fs.readFile(__dirname + '/index.html',
  //     function (err, data) {
  //       if (err) {
  //         res.status(500);
  //         return res.send('Error loading index.html');
  //       }

  //       res.status(200);
  //       res.sendFile(data);
  //     }
  // );
});
app.get(/^\/(.+)$/, function(req, res) {
    let movie = req.params[0];
  console.log(movie);
    res.sendFile(__dirname + `/korra/${movie}`);
});

server.listen(8080);

io.on('connection', function (socket) {
  console.log("user connected");

  socket.on('disconnect', function() {
    console.log("user disconnected");
  });

  socket.on('loadUrl', function(url) {
    console.log("loading url: " + url);
    io.sockets.emit('loadUrl', url);
  });

  socket.on('loadFile', function(path) {
    console.log("loading file: " + path);
    io.sockets.emit('loadFile', path);
  });

  socket.on('startPlaying', function() {
    console.log("play");
    io.sockets.emit('startPlaying');
  });

  socket.on('stopPlaying', function() {
    console.log("pause");
    io.sockets.emit('stopPlaying');
  });

  socket.on('setTime', function(seconds) {
    console.log("set time " + seconds);
    io.sockets.emit('setTime', seconds);
  });

  socket.on('message', function(message) {
    console.log(socket.id + ' says: ' + message);
  });
});
