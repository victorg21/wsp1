var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
//var $ = require('jQuery');

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

	this.getContentOne = function (id, callback, errorCallback) {
		mongoose.connect('mongodb://localhost:27017/victor');
		let db = mongoose.connection;

		console.log("connected to mongodb://localhost:27017/victor");

		db.on('error', function() {
			console.log("dbfun getContentOne error");
			errorCallback({error:"true", errorMsg:"No Connection to db"})
		});

		db.once('open', function () {
			console.log("getContentOne connected!");
			Product.findOne({id: id}, function(error, row) {
				//mongoose.connection.disconnect();
				db.close();
				if(error) {
					console.log("getContentOne find error = " +error);
					errorCallback({error:"true", errorMsg:"No data found id=" +id})
				}else{
					console.log("getContentOne find success row = " +row);
					callback(row);
				}
			});
		});
	}

	this.getContent = function (callback, errorCallback) {
		mongoose.connect('mongodb://localhost:27017/victor');
		let db = mongoose.connection;

		console.log("connected to mongodb://localhost:27017/victor");

		db.on('error', function() {
			console.log("dbfun getContent error");
			errorCallback({error:"true", errorMsg:"No Connection to db"})
		});

		db.once('open', function () {
			console.log("getContentOne connected!");
			Product.find(function(error, row) {
				//mongoose.connection.disconnect();
				db.close();
				if(error) {
					console.log("getContent find error = " +error);
					errorCallback({error:"true", errorMsg:"No data found"})
				}else{
					console.log("getContent find success row = " +row);
					var dataArray = [];
					for (let i = 0; i < row.length; i++) {
						dataArray.push({id:row[i].id, name:row[i].name, phone:row[i].phone, address:row[i].address});
					}
					callback(dataArray);
				}
			});
		});
	}

	/*
	* row: object contains data
	*/
	this.addRow = function (row, callback, errorCallback) {
		var product = new Product({name:row.name, id:row.id, address:row.address, phone:row.phone});

		mongoose.connect('mongodb://localhost:27017/victor');
		let db = mongoose.connection;

		console.log("connected to mongodb://localhost:27017/victor");

		db.on('error', function() {
			console.log("dbfun addRow error");
			errorCallback({error:"true", errorMsg:"No Connection to db"})
		});

		db.once('open', function () {
			console.log("addRow connected!");
			product.save(function(error,row) {
				if(error) {
					console.log("addRow save error = " +error);
					errorCallback({error:"true", errorMsg:"Error while inserting row to db!"});
				}else{
					console.log("addRow save row success!");
					callback([row, {notify:"New row insert into db successfully!"}]);
				}
			});
		});
	}

	this.delete = function(query, callback, errorCallback) {
		mongoose.connect('mongodb://localhost:27017/victor');
		let db = mongoose.connection;

		console.log("connected to mongodb://localhost:27017/victor");

		db.on('error', function() {
			console.log("dbfun delete error");
			errorCallback({error:"true", errorMsg:"No Connection to db"})
		});

		db.once('open', function () {
			console.log("delete connected!");
			Product.remove(query, function(error) {
				if(error) {
					console.log("Error while deleting query = " +JSON.stringify(query) +" error = " +error);
					errorCallback("Error while deleting query = " +JSON.stringify(query));
				}else{
					console.dir("Ok deleting query = " +JSON.stringify(query));
					callback("Query deleted successfully!");
				}
			});
		});
	}
};

module.exports = dbFun;

