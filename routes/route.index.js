const express = require('express')
const app = express.Router();

require('./endpoints/product')(app);
require('./endpoints/products')(app);


module.exports = app;