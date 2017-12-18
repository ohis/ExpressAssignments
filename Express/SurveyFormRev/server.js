var express = require("express");

var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));

app.set("views", path.join(__dirname, "./views"));

app.set("view engine", "ejs");

app.get('/',function(req,res){
  res.render("index");
})

var server = app.listen(8000, function(){
  console.log("Listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  console.log("Cient/socket is connected!");
  console.log("Client/socket id is ", socket.id);

  socket.on("posting_form", function(data){
    console.log("The form data is :"+data.name);
    socket.emit('updated_message',{response: data});
    var rand = Math.floor(Math.random()*(1000 - 1 + 1)) + 1;
    socket.emit('random_num', {response:rand })
  })
})
