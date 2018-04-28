var http = require('http');
var url = require('url') ;
var qs = require('querystring');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var rows = 10;
    var cols = 10;

    //did we receive the rows and cols parameters
    var body = [];
    var POST = {};

    req.on('data', (chunk) => {
        body.push(chunk);
    });
    req.on('end', function () {
        if() {
            body = Buffer.concat(body).toString();
            let pBody = body.split('&');
            for (var i = 0; i < pBody.length; i++) {
                var _data = pBody[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log("rows=" + POST.rows + " cols=" + POST.cols);
        }else{

        }
    });

    var str = '';
    console.log("POST=" +POST);

    let pr = POST.rows;
    let pc = POST.cols;
    console.log("pr=" +pr +" pc=" +pc);
    console.log("2222 rows=" +POST.rows +" cols=" +POST.cols);
    rows = pr && isNaN(pr) ? parseInt(pr) : 10;
    cols = pc && isNaN(pc) ? parseInt(pc) : 10;
    if(rows < 10 && rows > 0 && cols < 10 && cols >0)
    {
        str += "<p>Bad parameters</p>"
    }

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
    str += form;

    //writing str back to the client
    res.end(str);

}).listen(1300);