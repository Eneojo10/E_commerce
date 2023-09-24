const express = require('express')
const app = express.Router();

require('./endpoints/product')(app);


module.exports = app;cl