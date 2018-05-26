var MongoClient = require('mongodb').MongoClient;

//mongodb://<USERNAME>:<PASSWORD>@cluster0-shard-00-00-mmpvu.mongodb.net:27017,cluster0-shard-00-01-mmpvu.mongodb.net:27017,cluster0-shard-00-02-mmpvu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin

var uri = "mongodb://vguata%40gmail.com%3AWsxqaz@123@cluster0-shard-00-00-mmpvu.mongodb.net:27017,cluster0-shard-00-01-mmpvu.mongodb.net:27017,cluster0-shard-00-02-mmpvu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
	console.log(err);
	console.log(typeof db);
	try {
		db.test.insertOne( { item: "card", qty: 15 } );
		console.log("After insertion");
	} catch (e) {
		console.log (e);
	};
	db.close();
});
