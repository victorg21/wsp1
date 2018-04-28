
const http = require('http');
const url = require('url') ;
const querystring = require('querystring');
const dbfun = require('./dbfun.js');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    let body = "";
    let action = "";

    req.on('data', function (chunk) {
        body += chunk;
        console.log('data body=' +body);
    });

    req.on('end', function () {
        var str = '<html><head><link rel="icon" href="data:,"></head><body>';

        if (body != '') {
            body = querystring.parse(body);
            action = body.action;
            console.log('end post action=' + action);
        } else {
            var query = url.parse(req.url, true).query;
            action = query.action;
            console.log('end get action=' + action);
        }

        switch (action) {
             case "add":
                console.log('part add =' +typeof dbfun.addRow);
                dbfun.addRow(body);
                break;

            case "display":
                console.log('part dispaly =' +typeof dbfun.getContent);
                dbfun.getContent(function(tab){
                    var str = '<html><head><link rel="icon" href="data:,"></head><body>';
                    if((typeof tab) == 'string'){
                        str += "<h1>Error connecting to db error=" +tab +"</h1>"
                    }else{
                        str += "<table><tr><th>id</th><th>name</th><tr/>";
                        for(var row in tab) {
                            str += "<tr><td>" + row.id + "</td><td>" + row.name + "</td></tr>";
                        }
                        str += "</table>";
                    }
                    str += "</body></head>";
                    res.end(str);
                });
                return;
                break;

            default:
                console.log('default');
                break;
        }

        str += '<form method="post" action="/">' +
            '<span style="display:inline-block;width:80px;">name:</span><input name="name" /></br>' +
            '<span style="display:inline-block;width:80px;">address:</span><input name="address" /></br>' +
            '<span style="display:inline-block;width:80px;">phone:</span><input name="phone" /></br>' +
            '<span style="display:inline-block;width:80px;">id:</span><input name="id" /></br>' +
            '<input type="hidden" name="action" value="add"/></br>' +
            '<button type="submit">Add to db</button></br></br>' +
            '</form>' +
            '<div><a href="/?action=display">Display db</a></div>';

        str += "</body></head>";
        res.end(str);
    });
}).listen(1300);
