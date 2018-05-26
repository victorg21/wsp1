const http = require('http');
const url = require('url');
const querystring = require('querystring');


http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	let body = "";
	let action = "";

	req.on('data', function (chunk) {
		body += chunk;
		console.log('data body=' + body);
	});

	req.on('end', function () {
		if (body != '') {
			body = querystring.parse(body)
			action = body.action;
			console.log('end post action=' + action);
		} else {
			var query = url.parse(req.url, true).query;
			action = query.action;
			console.log('end get action=' + action);
		}

		const headers = res.getHeaderNames();
		let pretty = JSON.stringify(headers);
		res.end(pretty);

	});
}).listen(1300);
