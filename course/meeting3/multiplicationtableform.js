var http = require('http');
var url = require('url') ;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var rows = 10;
    var cols = 10;

    //did we receive the rows and cols parameters
    var body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    });
    req.on('end', function () {
        body = Buffer.concat(body).toString();
        console.log('POSTed: ' + body);
    });
    if(true)
    {



    }

    //building the multiplication table into str
    var str = '';
    var multiplication = '';
    multiplication += "<table border='1'>";
    var r = 1;
    while(r<=rows) {
        let c = 1;
        multiplication += "<tr>";
        while(c<=cols){
            multiplication += "<td>"+(r*c)+"</td>";
            c++;
        }
        multiplication += "</tr>";
        r++;
    }
    multiplication += "</table>";
    str += multiplication;

    //adding the form code to str
    var form = '<form method="post">' +
        'Rows: <input name="rows"><br>' +
        'Cols: <input name="cols"><br>' +
        '<input type="submit">' +
        '</form>';
    str += form;

    //writing str back to the client
    res.end(str);

}).listen(1300);