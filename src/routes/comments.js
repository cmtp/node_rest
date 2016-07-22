var router = require('express').Router()
var Posts = require('../models/posts.js')

//--------------------------------------------------------------
router.get('/posts/:postId/comments', function (req, res) {
  var postId = req.params.postId

  Posts.findOne({_id: postId})
    .then(function (result) {
        res.send(result.comments)
    }).catch(function (err) {
      console.log(err)
    })
})

router.post('/posts/:postId/comments', function (req, res) {
  var postId = req.params.postId

  Posts.findByIdAndUpdate(postId, {$push: {"comments": req.body } }, { new: true })
    .then(function (result) {
        res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

router.put('/posts/:postId/comments/:commentId', function (req, res) {
  var postId = req.params.postId
  var commentId = req.params.commentId

  Posts.update({'comments._id': commentId }, { $set: { "comments.$.text": req.body.text } }, { new: true })
    .then(function (result) {
        res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

router.delete('/posts/:postId/comments/:commentId', function (req, res) {
  var postId = req.params.postId
  var commentId = req.params.commentId

  Posts.findByIdAndUpdate(postId, {$pull: {"comments": { _id: commentId } } }, { new: true })
    .then(function (result) {
        res.send(result)
    }).catch(function (err) {
      console.log(err)
    })
})

module.exports = router