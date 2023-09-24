const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema(
  {
    title: { type: String },
    
  },
  { timestamps: true }
);

const Products = mongoose.model('product', ProductsSchema);

module.exports = Products;
