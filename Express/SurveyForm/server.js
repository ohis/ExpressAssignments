var express = require('express');

var app = express();

var path = require('path');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "./static")));

app.set("views", path.join(__dirname, "./views"));

app.set("view engine","ejs");

app.get('/', function(req,res){
  res.render("index");
})



app.post('/survey', function(req,res){
  var info = {
    name :req.body.name,
    location : req.body.location,
    language : req.body.language,
    comment : req.body.comment
  }

  res.render('result',{info:info});
})

app.listen(8000,function(){
  console.log("listening on port 8000");
})
