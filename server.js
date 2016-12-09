var path = require('path');

var staticDir = path.join(__dirname, 'public');
var index = 'index.html';
//var fourohfour = '404.html';
var style = 'style.css';
var style2 = 'style2.css';
var reset = 'reset.css';
var bg = 'bg.css';
//var js = ''; //for any js
var port = process.env.PORT || 3000;

var http = require("http");
var url = require("url");
var fs = require("fs");

var cache = {};
console.log("staticDir:", staticDir);
cache[index] = fs.readFileSync(path.join(staticDir, '/index.html'));
cache[fourohfour] = fs.readFileSync(path.join(staticDir, '/404.html'));
cache[style] = fs.readFileSync(path.join(staticDir, '/style.css'));
cache[style2] = fs.readFileSync(path.join(staticDir, '/style2.css'));
cache[reset] = fs.readFileSync(path.join(staticDir, '/reset.css'));
cache[bg] = fs.readFileSync(path.join(staticDir, '/bg.css'));
//cache[js] = fs.readFileSync(path.join(staticDir, '/js/file.js'));

var server = http.createServer(function(req, res){

	var url = req.url;
	url = req.url.substr(1);
	console.log("== url:", url);

	if(url==index || url==style || url==notFound || url=='')
	{
			res.statusCode = 200;
			console.log("== Status Code:", res.statusCode);
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
});
server.listen(port, function() {
  console.log("== Server listening on port:", port);
});
