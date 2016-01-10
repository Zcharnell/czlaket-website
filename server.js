
// =====================
//        [SETUP]
// =====================
    var express = require('express');
    var app = express();
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var errorhandler = require('errorhandler');
    var server = require('http').createServer(app);

// =====================
//    [CONFIGURATION]
// =====================
    // mongoose.connect('mongodb://127.0.0.1:27017/todoList');     // connect to mongoDB database locally
    // mongoose.connect('mongodb://heroku_app37223829:tolsu4ust0l7mhob7ahlon4v14@ds041032.mongolab.com:41032/heroku_app37223829/zcharnellphotos');

    app.use(express.static(__dirname + '/dev'));
    app.use('/js', express.static(__dirname + '/dev/js'));
    app.use('/scss', express.static(__dirname + '/dev/scss'));
    app.use('/css', express.static(__dirname + '/dev/css'));
    app.use('/templates', express.static(__dirname + '/dev/templates'));
    app.use('/json', express.static(__dirname + '/dev/json'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.use('/assets', express.static(__dirname + '/dev/assets'));

    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(errorhandler({
      dumpExceptions: true,
      showStack: true
    }));

// // =====================
// //      [MODELS]
// // =====================
//     // define model =================
//     var TodoSchema = new Schema({
//         text:String
//     });
//     var TodosSchema = new Schema({
//         title:String,
//         todos:[TodoSchema]
//     });

//     var Todo = mongoose.model('Todo',TodoSchema);

//     var Todos = mongoose.model('Todos',TodosSchema);


// // =====================
// //      [VARIABLES]
// // =====================
//     var todosList = {};
//     // var todosList = new Todos();

//     Todos.find(function(err, todos) {
//         if (err)
//             res.send(err)
//         // console.log(todos);

//         if(todos.length == 0){
//             todosList = new Todos({title:"Todos List"});
//             todosList.save(function(err,data) {
//                 if (err)
//                     console.log(err);
//                 res.json(data);
//             });
//         } else {
//             todosList = todos[0];
//             // console.log(todosList);
//         }
//         // if(todos.length > 1){
//             // for(var i = todos.length-1; i>0; i--){
//             //     Todos.remove({
//             //         _id : todos[i]._id
//             //     }, function(err, todo) {
//             //         if (err)
//             //             res.send(err);
//             //         i--;
//             //     });
//             // }
//         // }
//     });


// // =====================
// //      [ROUTES]
// // =====================
//     // api ---------------------------------------------------------------------
//     // get all todos
//     app.get('/api/:id/todos', function(req, res) {
//         console.log('GET params: ',req.params);
//         if(req.params.id != "zcharapp"){
//             res.send("Incorrect ID");
//         } else {
//             Todos.find(function(err, todos) {

//                 if (err)
//                     res.send(err)

//                 var todosObj = {todos:{}};
//                 todos[0].todos.forEach(function (todo) {
//                     todosObj.todos[todo._id] = todo;
//                 });

//                 res.json(todosObj);
//             });
//         }
//     });

//     //single todo
//     app.get('/api/:id/todos/:todo_id', function(req, res) {
//         console.log('GET params: ',req.params);
//         if(req.params.id != "zcharapp"){
//             res.send("Incorrect ID");
//         }
//         else {
//             // use mongoose to get all todos in the database
//             var todo = todosList.todos.id(req.params.todo_id);
//             if(todo != null){
//                 res.json(todo);
//             } else {
//                 res.status(404)
//                     .send("No todo was found with that id.");
//             }
//             // Todo.find({
//             //     _id: req.params.todo_id
//             // },function(err, todo) {

//             //     // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//             //     if (err)
//             //         res.send(err)

//             //     res.json(todo); // return all todos in JSON format
//             // });
//         }
//     });

//     // create todo and send back all todos after creation
//     app.post('/api/:id/todos', function(req, res) {
//         console.log('POST params: ',req.params);
//         // create a todo, information comes from AJAX request from Angular
//         todosList.todos.push({text : req.body.text});
//         todosList.save(function(err,data) {
//             if (err)
//                 res.send(err);
//             res.json(data);
//         });
//     });

//     // delete a todo
//     app.delete('/api/:id/todos/:todo_id', function(req, res) {
//         console.log(req.params);
//         var found = false;

//         for(var i in todosList.todos){
//             if(todosList.todos[i]._id == req.params.todo_id){
//                 found = true;
//                 todosList.todos[i].remove();
//             }
//         }

//         if(found){
//             todosList.save(function(err,data) {
//                 if (err)
//                     res.send(err);
//                 res.json(data);
//             });
//         } else {
//             res.status(404)
//                 .send("No todo was found with that id.");
//         }
//     });









// //###########################
// //    Photo Uploader
// //###########################


// // var db = require('mongoskin').db('mongodb://heroku_app37223829:tolsu4ust0l7mhob7ahlon4v14@ds041032.mongolab.com:41032/heroku_app37223829/zcharnellphotos');
// // console.log(db);


// app.get("/renamephoto", function (req, res) {
//   var x = req.query;
//   var callback = function(error, result){
//     if(result)
//     {
//       res.end("done");
//     }
//   }
//   db.collection("data").findOne({id: x.id}, function(err, result1) {
//     if(result1){
//       console.log(result1);
//       result1.name = x.name;
//       db.collection("data").save(result1, callback);
//     }
//     else{
//       db.collection("data").insert(x, callback);
//     }
//   });  
// });

// app.get("/verifyphoto", function (req, res) {
//   var x = req.query;
//   var callback = function(error, result){
//     if(result)
//     {
//       res.end("verified");
//     }
//   }
//   db.collection("data").findOne({id: x.id}, function(err, result1) {
//     if(result1){
//       console.log(result1);
//       result1.verified = true;
//       db.collection("data").save(result1, callback);
//     }
//   });  
// });

// app.get("/deletephoto", function (req, res) {
//   var index = req.query.id;
//   var callback = function(error, result){
//     if(result)
//     {
//       res.end("deleted");
//     }
//   }
//   db.collection("data").remove({"id": index.toString()}, callback);
// });

// app.get("/listphotos", function (req, res) {
//   db.collection("data").find().toArray(function(err, result) {
//       if(result)
//       {
//       res.end(JSON.stringify(result));
//     }
//   });
// });









// // console.log('hi',process.env.NODE_ENV);
// // if(process.env.NODE_ENV == 'development'){
// // }

// // var fs = require('fs');
// var aws = require('aws-sdk');
// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || "AKIAJ6UBJY4ENCAWSAGA";
// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || "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";
// var S3_BUCKET = process.env.S3_BUCKET || "zcharnell-portfolio";
// // console.log(AWS_ACCESS_KEY,AWS_SECRET_KEY,S3_BUCKET);
// aws.config.loadFromPath('./credentials.json');
// var s3 = new aws.S3()//.client;

// // var multipart = require('connect-multiparty');
// // var multipartMiddleware = multipart();
// // app.use('/uploadFile', multipartMiddleware);

// // app.post('/uploadFile', function(req, res){
// //      var intname = req.body.fileInput;
// //      var fordb = JSON.parse(decodeURIComponent(req.body.fordb));
// //      console.log(JSON.stringify(fordb));

// //      db.collection("data").insert(fordb, function(err2, result){
// //          if(result){
// //              res.end("success");
// //          }
// //      });

// //      var tmpPath = req.files.input.path;
// //      var s3Path = '/' + intname;
                            
// //      fs.readFile(tmpPath, function (err, data) {
// //          var params = {
// //              Bucket: 'portfolio-unsplash',
// //              ACL: 'public-read',
// //              Key: intname,
// //              Body: data
// //          };
// //          s3.putObject(params, function(err1, data) {});
// //      });
     
// // });

// // app.post('/submit_form', function(req, res){
// //     username = req.body.username;
// //     full_name = req.body.full_name;
// //     avatar_url = req.body.avatar_url;
// //     update_account(username, full_name, avatar_url); // TODO: create this function
// //     // TODO: Return something useful or redirect
// // });



// app.get('/sign_s3', function(req, res){
//     console.log('SIGNING');
//     aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
//     var s3 = new aws.S3();
//     //console.log('bucket ' +);
//     var s3_params = {
//         Bucket: 'zcharnell-portfolio',
//         Key: req.query.file_name,
//         Expires: 60,
//         ContentType: req.query.file_type,
//         ACL: 'public-read'
//     };
//     s3.getSignedUrl('putObject', s3_params, function(err, data){
//         if(err){
//             console.log(err);
//         }
//         else{
//             var return_data = {
//                 signed_request: data,
//                 url: 'https://'+ S3_BUCKET + '.s3.amazonaws.com/'+req.query.file_name
//             };
//             res.write(JSON.stringify(return_data));
//             res.end();
//         }
//     });
// });




// =====================
//      [LISTEN]
// =====================
    app.set('port', (process.env.PORT || 8080));
    // app.listen(8080);
    // console.log("App listening on port 8080");

    server.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });