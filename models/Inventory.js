const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const inventorySchema = new Schema({
  name: String,
  category: String,
  size: Array,
  description: String,
  gender: String,
  ageRange: Number,
  color: String,
  image: String,
  image2: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;

//test