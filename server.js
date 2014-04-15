var express 	= require('express');
var app			= express();
var connect 	= require('connect');
var path 		= require('path');
var vash 		= require('vash');
var _			= require('lodash');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(connect.static(__dirname + '/public'));
app.use(connect.logger('dev'));
app.use(connect.json());
app.use(connect.urlencoded());

app.get('/', function(req, res){
	var useragent = req.headers['user-agent'],
		regex = /^facebookexternalhit\/1\.[01]/gim,
		isFacebook = regex.test(useragent),
		a = 0,
		model = [];
		
	_.transform(req.query, function(o, value, key){
		this.push({ key: key, value: value});
	}, a, model);
	
	if(model.length){
		if(isFacebook){
			return res.render('index', {query: model});			
		}
		else {
			return res.redirect('/');
		}
	}
	else {
  		return res.render('index', {query: [] });
	}
	
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});

