const express = require('express')
const app = express.Router();

require('./endpoints/product')(app);
// require('./endpoints/cart')(app);


module.exports = app;