var express = require("express");

var app = express();

var path = require("path");

var session = require("express-session");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//app.use(session({secret: 'dojo'}));
app.use(express.static(path.join(__dirname, "./static")));

app.set("views", path.join(__dirname, './views'));

app.set("view engine", 'ejs');
app.use(session({secret: 'codingdojorocks'}));
var count = 0;
app.get('/', function(req, res){
count+=1;
//req.session.counts = count;
  res.render("index", {count:count});
})

app.get('/twice', function(req,res){
  count+=2;
  res.render("index",{count:count});
})

app.get('/reset',function(req,res){
  count  = 0;
  res.render("index",{count:count});
})
app.post('/users', function(req,res){
  console.log("POST DATA", req.body.name);
  //count+=1;
  req.session.counts = count;
  console.log(req.session.counts);
  res.redirect('/');
})

app.listen(8000, function(){
  console.log("listening on port 8000");
});
