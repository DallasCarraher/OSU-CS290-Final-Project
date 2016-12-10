var path = require('path');

var homeDir = path.join(__dirname)
var cssDir = path.join(__dirname, 'css');
var imgDir = path.join(__dirname, 'img');
var index = 'index.html';
var fourohfour = '404.html';
var style = 'style.css';
var style2 = 'style2.css';
var reset = 'reset.css';
var bg = 'bg.css';
var logo = 'logo.png';
//var js = ''; //for any js
var port = process.env.PORT || 3000;

var http = require("http");
var url = require("url");
var fs = require("fs");
var formidable = require("formidable");

var cache = {};
//console.log("staticDir:", staticDir);
cache[index] = fs.readFileSync(path.join(homeDir, '/index.html'));
cache[fourohfour] = fs.readFileSync(path.join(homeDir, '/404.html'));
cache[style] = fs.readFileSync(path.join(cssDir, '/style.css'));
cache[style2] = fs.readFileSync(path.join(cssDir, '/style2.css'));
cache[reset] = fs.readFileSync(path.join(cssDir, '/reset.css'));
cache[bg] = fs.readFileSync(path.join(cssDir, '/bg.css'));
cache[logo] = fs.readFileSync(path.join(imgDir, 'logo.png'));
//cache[js] = fs.readFileSync(path.join(staticDir, '/js/file.js'));

var server = http.createServer(function(req, res){

	var url = req.url;
	url = req.url.substr(1);
	console.log("== url:", url);

	if(url==index || url==style || url==style2 || url==reset || url==bg || url==fourohfour || url==logo || url=='')
	{
			res.statusCode = 200;
			console.log("== Status Code:", res.statusCode);
			console.log("== current dir: ", __dirname)
			if(url==index || url==''){
				res.write(cache[index]);
			}
			if(url==style){
				res.write(cache[style]);
			}
      if(url==style2){
        res.write(cache[style2]);
      }
      if(url==reset){
        res.write(cache[reset]);
      }
      if(url==bg){
        res.write(cache[bg]);
      }
			if(url==fourohfour){
				res.write(cache[fourohfour]);
			}
			if(url==logo){
				res.write(cache[logo]);
			}
			//if(url==js)
			//{
				//res.write(cache[js]);
			//}
			res.end();
	}
	else{
			res.statusCode = 404;
			console.log("== Status Code: 404 (File not found)");
			res.write(cache['404.html']);
			res.end();
	}
	}
	else if(req.method.toLowerCase() == 'post'){
		processForm(req, res);
	}
});

function processForm(req, res) {
	var form = new formidable.IncomingForm();

	form.parse(req, function (err, fields, files) {
		//Store the data from the fields in your data store.
		//The data store could be a file or database or any other store based
		//on your application.
		res.writeHead(200, {
				'content-type': 'text/plain'
		});
		res.write('received the data:\n\n');
		res.end(util.inspect({
			fields: fields,
			files: files
		}));
		});
}

server.listen(port, function() {
  console.log("== Server listening on port:", port);
});
