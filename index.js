// code away!
const express = require('express')
const helmet = require('helmet')

const serverRouter = require('./server')
const server = express()

server.use(express.json())
server.use(helmet())

server.use('/', serverRouter)


const port = 5000
server.listen(port, () => {
       console.log('Server Running on http://localhost:5000');
})