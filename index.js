var express = require("express");
var mongoose = require("mongoose");
var URLs = require("./models/urls");
var validUrl = require("valid-url");
var urlobj = require("url");
var app = express();

app.use(express.static("public"));
app.set("view engine","pug");
app.set("views","./views");

var url = "mongodb://onur113:merhaba@ds125060.mlab.com:25060/urls"
// Before deploy the app you must remove the code above and uncomment the code below
//var url = process.env.MONGOLAB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(url);


app.get("/",(req,res)=>{
	console.log(urlobj.hostname);
	res.render("index");
})
app.use("/api",(req,res)=>{
	var reqUrl = new URLs();
	var _url = req.originalUrl.slice(5);

	if(!validUrl.isWebUri(_url)){
		res.json({"Error":"Not a valid url"});
		return;
	}

	reqUrl.url = _url;
	var short_url = generateUrl();
	reqUrl.shortUrl = short_url;

	reqUrl.save(function(err){
		if(err)
			res.send(err);
		else
			res.json({"original_url":reqUrl.url,"short_url":urlobj.protocol+"//"+urlobj.hostname+"/"+reqUrl.shortUrl});
	})
})
app.use("/:query",(req,res)=>{
	if(req.params.query==="bootstrap.min.css.map") return;
	URLs.findOne({"shortUrl":req.params.query},"url",(err,d)=>{
		if(err) return handleError(err);
		if(!d){
			res.json({"error":"This url is not on the database"});
			return;
		} 
		res.redirect(d.url);
	})
	console.log("query parameter: "+req.params.query);
})

function generateUrl(){
	var decodedUrl = ""
	for(i=0;i<6;i++){
		decodedUrl += Math.floor(Math.random()*9);
	}
	return decodedUrl;
}


app.listen(3000);