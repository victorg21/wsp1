var MongoClient = require('mongodb').MongoClient;

module.exports = {

	getContent: function (callback, msg) {
		console.log("[getContent] create connection to db callback=" +typeof callback);
		var uri = "mongodb://localhost:27017/";
		MongoClient.connect(uri, function (err, db) {
			if (err) {
				callback([], "[addRow error] query error " + err.toString());
			} else {
				var dbo = db.db("victor");
				dbo.collection("victor").find({}).toArray(function (err, result) {
					if (err) {
						callback([], "[addRow error] query error " + err.toString());
					} else {
						callback(result, msg);
					}
				});
			}
			db.close();
		});
	},

	/*
	* row: object contains data
	*/
	addRow: function (row, callback) {
		var uri = "mongodb://localhost:27017/";
		MongoClient.connect(uri, function (err, db) {
			if (err) {
				callback("[addRow error] query error " + err.toString());
			} else {
				var dbo = db.db("victor");
				dbo.collection("victor").insert({
					"name": row.name,
					"id": row.id,
					"address": row.address,
					"phone": row.phone
				}, function (err, res) {
					if (err) {
						callback("[addRow error] query error " + err.toString());
					} else {
						callback("[addRow success] 1 record inserted");
					}
				})
			}
			db.close();
		});
	}
};
