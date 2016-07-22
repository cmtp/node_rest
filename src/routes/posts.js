var router = require('express').Router()
var Posts = require('../models/posts.js')
//--------------------------------------------------------------
router.get('/users/:userId/posts', function (req, res) {
  var threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  var userId = req.params.userId
  var from = req.query.from || threeDaysAgo
  var to = req.query.to || new Date()

  Posts.find({userId: userId, createdAt: {"$gte": from, "$lt": to}})
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
});

router.get('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId
  Posts.findOne({_id: postId})
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
});

router.post('/users/:userId/posts', function (req, res) {
  Posts.create(req.body)
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

router.put('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId

  Posts.findByIdAndUpdate(postId, req.body, {new: true})
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

router.delete('/users/:userId/posts/:postId', function (req, res) {
  var postId = req.params.postId

  Posts.findByIdAndRemove(postId)
    .then(function (result) {
      res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

module.exports = router