const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    desc: { type: String, required: true },
    avatar: { type: String },
    price: { type: Number, required: true },
    categories: { type: String },
    color: { type: String },
    old_price:{type: Number, required:true},
    productId:{type: String, unique:true}
  },
  { timestamps: true }
);

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
