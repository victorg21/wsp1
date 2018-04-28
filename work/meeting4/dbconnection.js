var http = require('http');
var mysql = require('mysql');
http.createServer(function (req, res) {
    //var area = req.query.width * req.query.height;
    res.writeHead(200, {'Content-Type': 'text/html'});
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'victor',
        password: '1234',
        database: 'victor',
        port: 3306 });
    connection.connect();
    var query = connection.query(
        'SELECT * FROM addressBook',function(err, result, fields) {
            if (err) throw err;
            console.log('result: ', result);
            let str = "<table><tr><th>id</th><th>name</th><tr/>";
            for(let i=0; i<result.length; i++) {
                str += "<tr><td>"+result[i].id+"</td><td>"+result[i].name+"</td></tr>";
            }
            str += "</table>";
            res.end(str);
            connection.end();
        });
}).listen(1999);