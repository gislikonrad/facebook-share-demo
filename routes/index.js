
exports.index = function(req, res) {
	var useragent = req.useragent,
		model = {

		};

	console.log('index');
 	res.render('index', model);
}