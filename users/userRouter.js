const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb')
const router = express.Router();


router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ error: "The users information could not be retrieved." })
  })
})
router.post('/', validateUser, (req, res) => {
    Users.insert(req.body)
      .then(result => {
        res.status(201).json(result)
      })
});


router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
});
router.put('/:id', validateUserId, validateUser, (req, res) => {
    const update = req.body
    const id = req.params.id
    Users.update(req.params.id, update)
      .then(success => {
        Users.getById(req.params.id)
          .then(user => {
            res.status(200).json(user)
          })
          .catch(error => {
            console.log(error)
            res.status(500).json({ message: "User updated, but unable to retrieve user. Please try again." })
          })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: "There was an error updating this user." })
      })
});
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(success => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({errorMessage: "Error while deleting user. Please try again."})
    })
});


router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(error => {
        res.status(500).json({ errorMessage : "Error retrieving posts"})
      })
});
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body
  newPost.user_id = req.params.id
  Posts.insert(newPost)
  .then(result => {
    res.status(201).json(result)
  })
});

//custom middleware

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
      .then(user => {
        if(!user.name){
          res.status(400).json({ message: "invalid user id" })
        }else {
          req.user = user
          next()
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: "Unable to retrieve user. Please try again." })
      })
  }

function validateUser(req, res, next) {
    if(!req.body){
      res.status(400).json({ message: "missing user data" })
    } else{
      if(!req.body.name){
        res.status(400).json({ message: "missing required name field" })
      }else{
        next()
      }
    }
  }

function validatePost(req, res, next) {
    if(!req.body){
      res.status(400).json({ message: "missing post data" })
    } else{
      if(!req.body.text){
        res.status(400).json({ message: "missing required text field" })
      }else{
        next()
      }
    }
  }
module.exports = router;
