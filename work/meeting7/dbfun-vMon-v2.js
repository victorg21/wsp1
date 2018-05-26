//var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

function dbFun(){
	var productSchema = mongoose.Schema(
		{name:String, id:Number, address:String, phone:String});

	var Product = mongoose.model('victor',productSchema);

	this.getConnection = function(){
		mongoose.connect('mongodb://localhost:27017/victor');
		let db = mongoose.connection;
		console.log("connected to mongodb://localhost:27017/victor");
		db.on('error', function() {
			console.log("error")
		});

		return db;
	}

	this.getContent = function (db, callback, msg) {
		console.log("dbfun-vMon-v2 start getContent")
		db.on('error', function() {console.log("error")});

		db.once('open', function () {
			console.log("getContent connected!");
			Product.find(function(error, row) {
				//mongoose.connection.disconnect();
				if(error) {
					console.log("getContent find error = " +error);
				}else{
					console.log("getContent find success row = " +row);
					var dataArray = [];
					for (let i = 0; i < row.length; i++) {
						dataArray.push({id:row[i].id, name:row[i].name, phone:row[i].phone, address:row[i].address});
					}
					callback(dataArray, msg);
				}
			});
		});
	}

	/*
	* row: object contains data
	*/
	this.addRow = function (db, row, callback) {
		console.log("dbfun-vMon-v2 start addRow")
		let product = new Product({name:row.name, id:row.id, address:row.address, phone:row.phone});
		db.on('error', function() {console.log("error")});

		db.once('open', function () {
			console.log("addRow connected!");
			product.save(function(error,row) {
				if(error) {
					console.log("addRow save error = " +error);
					callback("Error while inserting row to db!");
				}else{
					console.log("addRow save row success!");
					callback("New row insert into db successfully!");
				}
			});
		});
	}
};

module.exports = dbFun;
