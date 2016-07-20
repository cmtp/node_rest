// Dependencies
// var q = require('q');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//init app express
var app = express();

var Users = require('./models/users.js');
console.log(Users);
//add plugins to express
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
//GET /
app.get('/', function (req, res) {
  res.send('Hello World!');
});
// POST /usuarios
app.post('/usuarios', function (req, res) {
    var user = req.body;
    // var resultado = Users.create(user);
    Users.create(user).then(function(resultado) {
        res.send(resultado);
    }).catch(function(err) {
        console.log(err);
    });
});
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
 */