const http = require('http');
const url = require('url');
const querystring = require('querystring');
const dbfun = require('./dbfun-vMon.js');
var mongoose = require('mongoose');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	let body = "";
	let action = "";
	let renderTable = this.renderTable;
	let tabArray = [];

	req.on('data', function (chunk) {
		body += chunk;
		console.log('data body=' + body);
	});

	req.on('end', function () {
		const style = '' +
			'<style>' +
			'div{box-sizing: border-box;width: 100%;height: 100%;white-space: nowrap;vertical-align: top}' +
			'.wrapper{width: 600px;height: 200px;}' +
			'.leftSide{display: inline-block;border: 1px solid green;width: 50%;}' +
			'.rightSide{display: inline-flex;border: 1px solid green;width: 50%;align-items: center;justify-content: center;}' +
			'form span{display: inline-block;width: 80px;}' +
			'table td{border: 1px solid green;}' +
			'</style>';

		const form = '' +
			'<div class="wrapper">' +
			'	<div style="height:1px;margin:20px 0px 20px 0px;border-bottom:1px solid red;">&nbsp;</div>' +
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
			'			<button onclick="document.location.href=\'/?action=display\';">Display db</button>' +
			' 		</div>' +
			'	</div>' +
			'</div>';

		let db = dbfun.getConnection();

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
				//let db = dbfun.getConnection();
				dbfun.getContent(db, renderTable, "");
				return;
				break;

			case "add":
				console.log('case add');
				//let db2 = dbfun.getConnection();
				dbfun.addRow(db, body, function (result) {
					let str = "";
					if (result.includes("success")) {
						str += "<p>The " + body.name + " successfully insert to db</p>";
					} else {
						str += "<p>Error insert to db</p>";
					}
					dbfun.getContent(db, renderTable, str);
				});

				break;
			default:
				console.log('case default renderTable = ' +typeof renderTable);
				console.log("dbfun.getContent = " +typeof dbfun.getContent);
				//let db3 = dbfun.getConnection();
				dbfun.getContent(db, renderTable, "");
				break;
		}

		function renderTable(tabArray, msg){
			console.log("tabArray = " +tabArray[0].name)
			var str = '<!DOCTYPE html><head><base href="/">' +
				'<link rel="icon" href="data:,">' +style +'</head><body>';

			if(msg &&(msg.trim() != '')){
				str += msg;
			}
			str += "<table><tr><th>Name</th><th>Id</th><th>Phone</th><th>Address</th></tr>";
			for (var i in tabArray) {
				str += "<tr><td>" + tabArray[i].name +"</td><td>" +tabArray[i].id +"</td><td>" +tabArray[i].phone +"</td><td>" +tabArray[i].address +"</td></tr>";
			}
			str += "</table>";
			str += form;

			res.end(str);
			mongoose.connection.close();
		}
	});
}).listen(1300);
