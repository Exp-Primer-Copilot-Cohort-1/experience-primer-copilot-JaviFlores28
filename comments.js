// Create web server
// npm install express
// npm install body-parser
// npm install mongoose

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

var Comment = require('./comment.model');

// Connect to mongodb
mongoose.connect('mongodb://localhost/comments');

// Create a new comment
app.post('/comment', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err, result) {
    res.json(result);
  });
});

// Get all comments
app.get('/comment', function(req, res) {
  Comment.find({}, function(err, results) {
    res.json(results);
  });
});

// Get a single comment
app.get('/comment/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, result) {
    res.json(result);
  });
});

// Update a comment
app.put('/comment/:id', function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
    res.json(result);
  });
});

// Delete a comment
app.delete('/comment/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err, result) {
    res.json(result);
  });
});

app.listen(3000);
console.log('Server is running on port 3000');