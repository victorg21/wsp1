var http = require('http');
var url = require('url') ;
http.createServer(function (req, res) {
    //var area = req.query.width * req.query.height;
    res.writeHead(200, {'Content-Type': 'text/html'});
    var queryObject = url.parse(req.url,true).query;
    var min = queryObject.min;
    var max = queryObject.max;
    var count = queryObject.count;
    var set = new Set([]);
    for(var i=0; set.size < count; i++){
        set.add(getRandomInt(min, max));
    }
    let arr = [...set];
    res.end('lotto is ' +arr.join());
    console.log('lotto is ' +arr.join());
}).listen(1331);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}