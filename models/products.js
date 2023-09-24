const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String },
    
  },
  { timestamps: true }
);

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
