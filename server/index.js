const express = require('express');
const http = require('http');
const router = require('./router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// Set up routing
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
// Sets the server port based on the environment variable, or to a default of 3090
const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
