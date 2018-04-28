var http = require('http');
var url = require('url') ;
http.createServer(function (req, res) {
    //var area = req.query.width * req.query.height;
    res.writeHead(200, {'Content-Type': 'text/html'});
    var queryObject = url.parse(req.url,true).query;
    res.end('area is '+
        (queryObject.width*queryObject.height));
}).listen(1331);