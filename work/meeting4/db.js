
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
		const form = '<form method="post" action="/">' +
			'<span style="display:inline-block;width:80px;">name:</span><input name="name" /></br>' +
			'<span style="display:inline-block;width:80px;">address:</span><input name="address" /></br>' +
			'<span style="display:inline-block;width:80px;">phone:</span><input name="phone" /></br>' +
			'<span style="display:inline-block;width:80px;">id:</span><input name="id" /></br>' +
			'<input type="hidden" name="action" value="add"/></br>' +
			'<button type="submit">Add to db</button></br></br>' +
			'</form>' +
			'<div><a href="/?action=display">Display db</a></div>';

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
            case "display":
                console.log('part dispaly =' +typeof dbfun.getContent);
                dbfun.getContent( function(tab){
                    var str = '<html><head><link rel="icon" href="data:,"></head><body>';
                    if((typeof tab) == 'string'){
                        str += "<h1>Error connecting to db error=" +tab +"</h1>"
                    }else{
                        str += form;
                        str += "<table><tr><th>id</th><th>name</th><tr/>";
                        for(var i in tab) {
                            str += "<tr><td>" + tab[i].id + "</td><td>" + tab[i].name + "</td></tr>";
                        }
                        str += "</table>";
                    }
                    str += "</body></head>";
                    res.end(str);
                });
                return;
                break;

			case "add":
				console.log('part add =' +typeof dbfun.addRow);
				dbfun.addRow(body, function (result) {
					var str = '<html><head><link rel="icon" href="data:,"></head><body>';
					str += form;
					if(result.includes("success")){
                        str += "<p>The " +body.name +" successfully insert to db</p>";
					}else{
						str += "<p>Error insert to db</p>";
                    }
					str += "</body></head>";
					res.end(str);
				});
				break;

			default:
                console.log('default');
				var str = '<html><head><link rel="icon" href="data:,"></head><body>';
				str += form;
				str += "</body></head>";
				res.end(str);
                break;
        }
    });
}).listen(1300);
