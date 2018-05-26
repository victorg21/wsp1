const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');


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

		getFiles(renderTable);

		function getFiles(callback) {
			fs.readdir("/", callback);
		}

		function abc(err, tabArray){
			for (var i in tabArray) {
				let file = tabArray[i];
				let idDir = fs.stat(file, );
			};
		}

		function renderTable(err, tabArray){
			var str = '<!DOCTYPE html><head><base href="/">' +
				'<link rel="icon" href="data:,"></head><body>';
			if ((typeof tabArray) == 'string') {
				str += "<h1>Error connecting to db error=" + tabArray + "</h1>"
			} else {
				str += "<table><tr><th>id</th><th>name</th></tr>";
				for (var i in tabArray) {
					let file = tabArray[i];
					let idDir = fs.isDirectory();
					str += "<tr><td>" + i + "</td><td>" + tabArray[i] + "</td></tr>";
				};
				str += "</table>";
			}
			str += '</body></html>';
			res.end(str);
		}
	});
}).listen(1300);
