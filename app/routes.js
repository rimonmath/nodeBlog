// app/routes.js

// load the todo model
var db = require("./models/schemas.js");

// expose the routes to our app with module.exports
module.exports = function(app) {

    app.post('/crud/create/:objName', function(req, res) {
        var data = req.body.data;   
        db.createObjects(req.params.objName, data, res);
    });


    app.get('/crud/list/:objName', function(req, res) {  
        db.listObjects(req.params.objName, null, res);
    });

    app.post('/search/:objName/', function(req, res) {
        console.log("testing");
        var searchCriteria = req.body;
        db.listObjects(req.params.objName, searchCriteria, res);
    });

    app.post('/crud/update/:objName', function(req, res) {
        var data = req.body;
        //data.$$hashKey = null;
        delete data.$$hashKey;
        delete data.username;
        console.log(data);
        var condition = {_id: data._id};
        db.updateObjects(req.params.objName, condition, data, res);
    });

    app.post('/crud/delete/:objName', function(req, res) {
        var condition = req.body;
        //data.$$hashKey = null;
        delete condition.$$hashKey;
        //console.log(data);
        //var condition = {_id: data._id};
        db.deleteObjects(req.params.objName, condition, res);
    });
    
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


};