var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express();

//------- database initialization
require('mongoose').Promise = require('q').Promise;
mongoose.connect('mongodb://localhost:27017/mean-auth');

//------- setting express middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//------- importing models
var Users = require('./models/user.js')
var Posts = require('./models/posts.js')

//routes
app.use(require('./routes/users.js'))
app.use(require('./routes/posts.js'))
app.use(require('./routes/comments.js'))


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});