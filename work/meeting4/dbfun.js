module.exports = {

	makeConnect: function () {
		var mysql = require('mysql');

		var connection = mysql.createConnection({
			host: 'localhost',
			user: 'victor',
			password: '1234',
			database: 'victor',
			port: 3306
		});
		return connection;
	},

	getContent: function (callback) {
		console.log("[getContent] create connection to db");
		var connection = this.makeConnect();

		connection.on('error', function (err) {
			console.log('[getContent] on connect error =' + err.toString());
			callback("connection error " + err.toString());
		});

		console.log('[getContent] try connect to db');
		connection.connect(function (err) {
			if (err) {
				console.log('[getContent] connect error =' + err.toString());
				callback("connection error " + err.toString());
			} else {
				console.log('[getContent] try query to db');
				var query = connection.query(
					'SELECT * FROM addressBook', function (err, result, fields) {
						if (err) {
							console.log('[getContent] query error');
							callback("connection error " + err.toString());
						}
						console.log('[getContent] result: ', result);
						var table = [];
						for (let i = 0; i < result.length; i++) {
							table.push({id: result[i].id, name: result[i].name});
						}
						connection.end();
						console.log("[getContent] end connection table=" + table.length);
						callback(table);
					});
			}
		});
	},

	/*
	* row: object contains data
	*/
	addRow: function (row, callback) {

		var connection = this.makeConnect();

		var post = {
			name: row.name,
			address: row.address,
			phone: row.phone,
			id: row.id
		}

		connection.connect(function (err) {
			if (err){
				callback("[addRow error] connection error " + err.toString());
				//throw err;
			} else{
				var sql = "INSERT INTO addressBook (name, address, phone, id) VALUES ('" + post.name + "','" + post.address + "','" + post.phone + "','" + post.id + "')";
				console.log("[addRow] query =" + sql);
				var query = connection.query(sql, function (err, result) {
					if (err){
						callback("[addRow error] query error " + err.toString());
						//throw err;
					}
					callback("[addRow success] 1 record inserted");
				});
				connection.end();
				callback("[addRow success]");
			}
		});
	}
};
