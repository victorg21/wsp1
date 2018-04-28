var http = require('http');

var postHTML =
    '<html><head><title>Post Example</title></head>' +
    '<body>' +
    '<form id="form" method="post">' +
    'rows: <input name="rows"><br>' +
    'cols: <input name="cols"><br>' +
    '<input type="submit">' +
    '</form>' +
    '<div id="table"' +
    '</div>' +
    '</body></html>';

http.createServer(function (req, res) {
    res.writeHead(200, {'ContentType':'text/html'});
    let rows = document.form.rows;

    res.end('<h1 style="color: red">Hello World from Cloud9</h1>\n');
}).listen(1234);
