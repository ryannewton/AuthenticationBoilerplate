const express = require('express');
const http = require('http');
const router = require('./router');

const app = express();

const mongoose = require('mongoose');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// Set up routing
router(app);

// Server Setup
// Sets the server port based on the environment variable, or to a default of 3090
const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
