const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

router.get('/', (req, res) => {
  Inventory.find()
    .then(inventory => {
      res.json(inventory)
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router