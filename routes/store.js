const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const User = require("../models/User")

router.get('/', (req, res) => {
  Inventory.find()
    .then(inventory => {
      res.json(inventory)
    })
    .catch(err => {
      res.json(err)
    })
})

router.post("/wishlist", (req, res) => {
  const { user, item } = req.body

  User.findOneAndUpdate({ _id: user._id }, {
    $push: { wishlist: item }
  })
  .then(data => res.json(user))
  .catch(err => console.log(err))
})

router.post("/wishlistremove", (req, res) => {
  const { user, item } = req.body

  User.findOneAndUpdate({ _id: user._id }, {
    $pull: { wishlist: item }
  })
  .then(data => res.json(user))
  .catch(err => console.log(err))
})

module.exports = router