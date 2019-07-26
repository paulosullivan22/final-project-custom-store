const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const inventorySchema = new Schema({
  itemName: String,
  itemType: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;
