const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  category: String,
  subCategory: String,
  imageSrc: String,
  title: String,
  price: String,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;