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
		query = [],
		url = req.protocol + '://' + req.get('host') + req.url,
		title = 'Facebook-share-demo',
		description = 'This is the page as it should be for a normal user';
		
	_.transform(req.query, function(o, value, key){
		this.push({ key: key, value: value});
	}, a, query);	
	
	if(query.length){		
		if(isFacebook){
			title = 'This is a share with a query string.';
			description = 'The query string included these parameters: ';
			for(var i = 0; i < query.length; i++) {
				if(i > 0){
					description += ', ';
				}
				description += query[i].key;
				description += '=';
				description += query[i].value;
				
			}
			return res.render('index', {query: query, title: title, description: description, url: url});			
		}
		else {
			return res.redirect('/');
		}
	}
	else {
  		return res.render('index', {query: [], title: title, description: description, url: url });
	}
	
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});

