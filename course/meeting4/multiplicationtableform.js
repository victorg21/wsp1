
var http = require('http');
var url = require('url') ;
var querystring = require('querystring');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var rows = 10;
    var cols = 10;

    //did we receive the rows and cols parameters
    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        console.log('POSTed: ' + body);

        var str = '<html><head><link rel="icon" href="data:,"></head><body>';

        if(body!='') {
            //extracting rows and cols from the body
            rows = querystring.parse(body).rows;
            cols = querystring.parse(body).cols;

            //building the multiplication table into str
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

            //writing str back to the client
            str += form;

            console.log('first part of if');
        } else {
            var form = '<form method="post">' +
                'Rows: <input name="rows"><br>' +
                'Cols: <input name="cols"><br>' +
                '<input type="submit">' +
                '</form>';

            str += form;

            console.log('second part of if');
        }
        str += "</body></head>";
        res.end(str);
    });

}).listen(1300);