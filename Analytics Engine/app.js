// IMPORTANT: Rename this file to app.js before continuing
// --- IMPORTS
var express = require('express')
 // , http = require('http')
  , path = require('path');
require('./dataGenerator.js');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

  // all environments
app.set('port', process.env.PORT || 3000);

// --- GLOBALS DATA & FUNCTIONS
var Metric = require('./metric.js').Metric;
var metrics = {
    "demo": (new Metric("demo")).add(5).add(6).add(7).add(8)
}

//------- EXPRESS MIDDLEWARE
app.use(express.logger('dev'));
app.use(express.bodyParser());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
//if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
//}

//-------- EXPRESS HANDLERS
//handler x

app.post('/metric', function(req,res){
	var mt = req.body;
	console.log(mt);
	var result="NOK";
	var m=mt['metric'];
	var v= mt['value'];
	if (m && v && (typeof m === "string" || m instanceof String) && !isNaN(parseFloat(v)))
	{
		result = "OK";
		if(metrics[m])
			metrics[m]=metrics[m].add(v);
		else
			metrics[m]=(new Metric(m)).add(v);
		//console.log(JSON.stringify(metrics[m].values));
		io.emit('publish', {'result':metrics[m].values}	);
	}		
	res.json({'result':result});	
});

app.get('/metrics', function(req,res){
	//res.header('content-type', 'application/json');
	var ms=Object.keys(metrics);
	res.json({'result':ms});
});

//handler y
app.get('/metric/:name', function(req,res){
	//res.header('content-type', 'application/json');
	var name = req.params["name"];
	var rs;
	if(metrics[name])
		rs=metrics[name].values;
	else
		rs="NOK";
	res.json({'result':rs});
});

app.get('/reset', function(req,res){
	//res.header('content-type', 'application/json');
	metrics = {"demo": (new Metric("demo")).add(5).add(6).add(7).add(8)};
	res.json({'result':"OK"});
});

//});
//-------- SOCKET.IO HANDLERS

//handler x			
//handler y

//-------- LISTENING
http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
