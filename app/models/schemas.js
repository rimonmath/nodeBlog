var mongoose = require('mongoose');

// mongoose.connect('mongodb://rmn:rmn@ds053194.mlab.com:53194/rmndb');
//mongoose.connect('mongodb://rimonmath:mla18152229@ds053194.mlab.com:53194/rmndb');
mongoose.connect('mongodb://rmn:rmn@ds053194.mlab.com:53194/rmndb');

var Schema = mongoose.Schema;

var allSchema = {};

allSchema.Users= new Schema({
    full_name : String,
    email : String,
    username: {type: String, unique: true},
    password: String,
    posts: {table_name: {type: String, default: "Posts"}, column_name: {type: String, default: "author"}},
    comments: {table_name: {type: String, default: "Comments"}, column_name: {type: String, default: "author"}}
});

allSchema.Posts= new Schema({
    author: {name: String, id: Schema.Types.ObjectId},
    title : String,
    tags: [String],
    category: {name: String, id: Schema.Types.ObjectId},
    excerpt : String,
    content: String,    
    comments: {table_name: {type: String, default: "Comments"}, column_name: {type: String, default: "post"}},
});

allSchema.Comments = new Schema({
	post: {id: Schema.Types.ObjectId},
	author: {name: String, id: Schema.Types.ObjectId},
	content: String
});

allSchema.Categories = new Schema({
	name: String,
	posts: {table_name: {type: String, default: "Posts"}, column_name: {type: String, default: "category"}},
});


module.exports.createObjects = function (schemaName, data, res) {
	var objModel = mongoose.model(schemaName, allSchema[schemaName]);
	objModel.create(data, function (err, newInstance) {
		if (err) {
			res.send(err.message)
			return console.error(err);
		}
		console.log(newInstance);
		res.send(newInstance)
	});
}

module.exports.listObjects = function (schemaName, searchCriteria, res) {
	var objModel = mongoose.model(schemaName, allSchema[schemaName]);
	console.log(searchCriteria);
	objModel.find(searchCriteria, function (err, objects) {
		if (err) {
			res.send(err.message)
			return console.error(err);
		}
	  	res.send(objects);
	});
}

module.exports.updateObjects = function (schemaName, condition, whatToUpdate, res) {
	var objModel = mongoose.model(schemaName, allSchema[schemaName]);
	var options = {multi: true};
	objModel.update(condition, whatToUpdate, options, function (err, message) {
		if (err) {
			res.send(err.message)
			return console.error(err);
		}
	  	res.send(message);
	});
}

module.exports.deleteObjects = function (schemaName, condition, res) {
	var objModel = mongoose.model(schemaName, allSchema[schemaName]);
	//var options = {multi: true};
	objModel.remove(condition, function (err, message) {
		if (err) {
			res.send(err.message)
			return console.error(err);
		}
	  	res.send(message);
	});
}

module.exports.mongooseClose = function () {
	mongoose.disconnect(function(err){
		if(err){
			console.log(err);
		}
	});	
}
