var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var urlSchema = new Schema({
	url:String,
	shortUrl:String
});

module.exports = mongoose.model("Url",urlSchema);