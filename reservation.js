var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var FitnessEquipments = [0,0,0,0,0,0];

io.on('connection', function(socket) {
  console.log("user connect");
  io.emit('checkOn', FitnessEquipments[0]);

  socket.on('checkIn', function(){
    console.log("checkIn");
    FitnessEquipments[0] = (FitnessEquipments[0]-1)*-1;
    console.log(FitnessEquipments[0]);
    io.emit('checkOn', FitnessEquipments[0]);
  });

  socket.on('checkOut', function(){
    console.log("checkOut");
    io.emit('checkOut', "Out");
  });

  socket.on('reservation', function(obj){
    console.log("OnReservation");
    console.log(obj);
    io.emit('checkOut', "Out");
  });

});

//서버를 시작한다.
http.listen(9000, function(){
  console.log("server on 9000");
});
