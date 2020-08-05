const express = require('express');
const Users = require('./userDb')
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
      .then(result => console.log(result))
});


router.get('/:id', (req, res) => {
  // do your magic!
});
router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});


router.get('/:id/posts', (req, res) => {
  // do your magic!
});
router.post('/:id/posts', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
    Users.getById(req.params.id)
      .then(user => {
        req.user = user
        next()
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ message: "invalid user id" })
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
      if(!req.body.name){
        res.status(400).json({ message: "missing required text field" })
      }else{
        next()
      }
    }
  }
module.exports = router;
