const express = require('express')
const helmet = require('helmet')

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json())
server.use(helmet())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/users', userRouter)
//custom middleware

function logger(req, res, next) {
  console.log(`A ${req.method} was made to ${req.url} at ${Date()}`)
  next()
}


module.exports = server;
