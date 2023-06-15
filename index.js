const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes/route.index');

const URL ='mongodb+srv://user2:SC0Rti33tCuCFFbn@cluster0.ue6i0eb.mongodb.net/ecommerce';
// const URL = 'mongodb://localhost:27017/commerce';
const PORT = 5000;


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => console.log('mongodb connected'));
mongoose.connection.on('error', (e) => console.log(e));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.get('/', function (req, res ) {
  res.send({msg: 'Our Api record'})
});

app.listen(PORT);
console.log('server is running on port 5000')