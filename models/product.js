const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true},
  desc: { type: String, required: true},
  img: { type: String},
  price: { type: Number, required: true},
  categories: { type: String},
  color: { type: String}
},
  {timestamps:true},
);

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;