var router = require('express').Router()

var Users = require('../models/user.js')
//------ controllers
router.get('/users', function (req, res) {
  Users.find().then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
});

router.get('/users/:userId', function (req, res) {
  var userId = req.params.userId;
  Users.findOne({_id: userId}).then(function (result) {
    if ( result === undefined  || result === null ) {
      res.status(404).send("Usuario no encontrado")
      return 
    }
    res.send(result)
  }).catch(function (err) {
    res.status(500).send('Internal server error')
  })
});

router.post('/users', function (req, res) {
  Users.create(req.body).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

router.put('/users/:userId', function (req, res) {
  var userId = req.params.userId;

  Users.findByIdAndUpdate(userId, req.body, {new: true}).then(function (result) {
    if ( result === undefined || result === null ) {
      res.status(404).send('Usuario no encontrado')
      return
    }
    res.send(result)
  }).catch(function (err) {
    res.status(500).send('Internal server error')
  })
})

router.delete('/users/:userId', function (req, res) {
  var userId = req.params.userId;

  Users.findByIdAndRemove(userId).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    console.log(err)
  })
})

module.exports = router
