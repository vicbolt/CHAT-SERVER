const express = require('express');

const morgan = require('morgan')
const routes = require('./routes/index')
const cors = require('cors')

const server = express();

//settings
server.set('PORT', 4500)

//middlewares
server.use(morgan('dev'))
server.use(cors())

server.use(express.json())

//routes
server.use('/user', routes.user)
server.use('/message', routes.message)

//public folder


module.exports = server;