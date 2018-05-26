const http = require('http');
const url = require('url');
const querystring = require('querystring');
const dbfun = require('./dbfun-v2.js');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	let body = "";
	let action = "";

	req.on('data', function (chunk) {
		body += chunk;
		console.log('data body=' + body);
	});

	req.on('end', function () {
		const form = '' +
			'<div class="wrapper">' +
			'	<div style="border-top:1px solid red;">&nbsp;</div>' +
			'	<div>' +
			'		<div class="leftSide">' +
			'			<form method="post" action="/">' +
			'				<span>name:</span><input name="name" /><br/>' +
			'				<span>address:</span><input name="address" /><br/>' +
			'				<span>phone:</span><input name="phone" /><br/>' +
			'				<span>id:</span><input name="id" /><br/>' +
			'				<input type="hidden" name="action" value="add"/><br/>' +
			'				<button style="display:block;margin:auto;" type="submit">Add to db</button><br/><br/>' +
			'			</form>' +
			'		</div>' +
			'		<div class="rightSide">' +
			'			<button onclick="?action=display">Display db</button>' +
			' 		</div>' +
			'	</div>' +
			'</div>';

		if (body != '') {
			body = querystring.parse(body)
			action = body.action;
			console.log('end post action=' + action);
		} else {
			var query = url.parse(req.url, true).query;
			action = query.action;
			console.log('end get action=' + action);
		}

		switch (action) {
			case "display":
				console.log('case dispaly');
				dbfun.getContent(renderTable(tabArray));
				return;
				break;

			case "add":
				console.log('case add');
				dbfun.addRow(body, function (result) {
					var str = '<!DOCTYPE html><head><base href="/">' +
							'<link rel="icon" href="data:,"></head><body>';
					str += form;
					if (result.includes("success")) {
						str += "<p>The " + body.name + " successfully insert to db</p>";
					} else {
						str += "<p>Error insert to db</p>";
					}
					str += '<script>' +
						'var link = document.createElement( "link" );' +
						'link.href = "/db.css";' +
						'link.type = "text/css";' +
						'link.rel = "stylesheet";' +
						'document.getElementsByTagName("head")[0].appendChild(link)' +
						'</script></body></html>';
					res.end(str);
				});
				break;

			default:
				console.log('default');
				dbfun.getContent(renderTable);
				break;
		}

		function renderTable(tabArray){
			var str = '<!DOCTYPE html><head><base href="/">' +
				'<link rel="icon" href="data:,"></head><body>';
			if ((typeof tabArray) == 'string') {
				str += "<h1>Error connecting to db error=" + tabArray + "</h1>"
			} else {
				str += "<table><tr><th>id</th><th>name</th></tr>";
				for (var i in tabArray) {
					str += "<tr><td>" + tabArray[i].id + "</td><td>" + tabArray[i].name + "</td></tr>";
				}
				str += "</table>";
				str += form;
			}
			str += '<script>' +
					'var link = document.createElement( "link" );' +
					'link.href = "/db.css";' +
					'link.type = "text/css";' +
					'link.rel = "stylesheet";' +
					'document.getElementsByTagName("head")[0].appendChild(link)' +
				'</script></body></html>';
			res.end(str);
		}
	});
}).listen(1300);
