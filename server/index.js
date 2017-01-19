const express = require('express');
const http = require('http');
const router = require('./router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// Set up routing

// Morgan adds event logging
app.use(morgan('combined'));

// cors tells the server to allow Cross-Origin Resource Sharing
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
// Sets the server port based on the environment variable, or to a default of 3090
const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
