var mongoose = require('mongoose');
var restify = require('restify');
const DbFun = require('./restFun.js');

var dbfun = new DbFun();

var server = restify.createServer({
	name : "restifysample"
});

server.listen(1400 ,'127.0.0.1', function() {
	console.log('%s listening at %s ', server.name ,
		server.url);
});

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

var PATH = '/students';
server.get(PATH +'/:id', findStudent);
server.get(PATH, findStudents);
server.post(PATH, addStudent);
server.del(PATH +'/delete/:id', deleteStudent);

function findStudent(req,res,next) {
	console.log("Start findStudent req.params.studid = " +req.params.studid);
	var id = req.params.studid;

	dbfun.getContentOne(id,
		function(row){
			res.send(200, {'id':row.id, 'name':row.name, 'phone':row.phone, 'address':row.address});
		},
		function(obj){
			res.send(200, obj)
		})

	return next();
}

function findStudents(req,res,next) {
	console.log("Start findStudents");
	dbfun.getContent(
		function(row){
			res.send(200, row);
		},
		function(obj){
			res.send(200, obj)
		});
	return next();
}

function addStudent(req,res,next) {
	var student = {};
	student.id = req.body.id;
	student.name = req.body.name;
	student.phone = req.body.phone;
	student.address = req.body.address;
	console.log("addStudent student" +JSON.stringify(student));

	dbfun.addRow(student,
		function(obj){
			res.send(200, obj);
		},
		function(obj){
			res.send(200, obj)
		});

	return next();
}

function deleteStudent(req,res,next) {
	var id = req.params.id;
	console.log("Start deleteStudent req.params.id = "+id);
	dbfun.delete({'id':id},
		function() {
			res.send(200, {'id': id, 'deleted': true});
		},
		function(obj){
			res.send(200, obj)
		});
	return next();
}

