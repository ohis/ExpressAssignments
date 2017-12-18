var express = require("express");

var app = express();

var path = require("path");

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, "./views"));
app.set("view engine","ejs");

app.get('/', function(req,res){
  res.render("index");
})

var server = app.listen(6789, function(){
  console.log("Listening on port 6789");
});

var io = require('socket.io').listen(server);
var num = 0;
io.sockets.on('connection', function(socket){
  console.log("Client/socket is connected");
  console.log("Client/socket id is:", socket.id);

  socket.on( "button_clicked", function (data){
    num++;
    console.log(num);
    console.log( 'Someone clicked a button!  Reason: '  + data.reason);
    socket.emit( 'server_response', {response:  num});
});

socket.on( "reset_button", function (data){
  num = 0;
  console.log(num);
  console.log( 'Someone clicked a reset button!  Reason: '  + data.reason);
  socket.emit( 'button_reset', {response:  num});
});

})
