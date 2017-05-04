var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var transactionsPath = path.join(__dirname +'/data/transactions.json');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/transactions', function(req, res){
  var content;
  fs.readFile('./data/transactions.json',"utf-8",function(err, data) {
  	if(err){
  	  throw err;
  	}
  	content = data;
  	console.log(content);
  	res.setHeader('Content-Type', 'application/json');
  	res.send(content);
  });
  
});

app.use("*",function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});