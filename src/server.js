// Dependencies
// var q = require('q');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//init app express
var app = express();

var Users = require('./models/users.js');
var Posts = require('./models/posts.js')

//add plugins to express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// POST registrar usuario
app.post('/users', function (req, res) {
    var user = req.body;
    // var result = Users.create(user);
    Users.create(user).then(function(result) {
        res.send(result);
    }).catch(function(err) {
        console.log(err);
    });
});
// GET lista de usuarios
app.get('/users', function(req, res) {
    // .find({name: 'chris'})
    Users.find().then(function(result) {
        res.send(result);
    }).catch(function(err) {
        console.log(err);
    });
});
//GET mostrar un usuario por su id
app.get('/users/:userId', function(req, res) {
    var userId = req.params.userId;
    Users.findById({id: userId}).then(function(result) {
        res.send(result);
    }).catch(function(err) {
        console.log(err);
    });
});
// PUT actualizar usuario
app.put('/users/:userId', function(req,res) {
    var userId = req.params.userId;
    Users.updateId(userId, req.body).then(function (result) {
        res.send(result);
    }).catch(function(err) {
        console.log(err);
    });
});
// DELETE remover un usuario
app.delete('/users/:userId', function(req,res) {
    var userId = req.params.userId;

    Users.deleteId(userId).then(function(result) {
        res.send(result);
    }).catch(function (err) {
        console.log(err);
    });
});

//--------------------------------------------------------------
app.get('/users/:userId/posts', function (req, res) {
  var userId = req.params.userId;
  Posts.find({userId: userId}).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

app.get('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId;
  Posts.findOne({id: postId}).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

app.post('/users/:userId/posts', function (req, res) {
  Posts.create(req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.put('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId;

  Posts.findByIdAndUpdate(postId, req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

app.delete('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId;

  Posts.findByIdAndRemove(postId).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

// listener
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


/**
 * 
 * GET /usuarios => lista de usuarios
 * GET /usuarios/:usuarioId => usuario especifico
 * POST /usuarios => registrar un usuario
 * PUT /usuarios:usuarioId => modificar un usuario
 * DELETE /usuarios/:usuarioId => eliminar un usuario
 * /publicaciones
 * /comentarios
 * 
 * 
 * posts
 * 
 * 
 */