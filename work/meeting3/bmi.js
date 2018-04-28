var http = require('http');
var url = require('url') ;
http.createServer(function (req, res) {
    //var bmi = req.query.weight * req.query.height;
    res.writeHead(200, {'Content-Type': 'text/html'});
    var queryObject = url.parse(req.url,true).query;
    res.end('bmi is '+
        (queryObject.weight * queryObject.height / 100));
}).listen(1331);