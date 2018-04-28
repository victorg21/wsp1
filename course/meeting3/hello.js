var http = require('http');
var url = require('url') ;
http.createServer(function (req, res) {
    //var area = req.query.width * req.query.height;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var queryObject = url.parse(req.url,true).query;
    var count = queryObject.count;
    var min = queryObject.min; //2
    var max = queryObject.max; //20
    var difference = max - min;
    var numbers = new Set();
    while(numbers.size<count) {
        numbers.add(parseInt(min)+Math.floor(difference*Math.random()));
    }
    str = '';
    numbers.forEach(num => str+=num+' ');
    res.end('numbers are '+ str);

}).listen(1300);