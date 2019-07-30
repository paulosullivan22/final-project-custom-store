const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const User = require("../models/User")

router.get("/", (req, res) => {
  Inventory.find()
    .then(inventory => {
      res.json(inventory)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get("/personalstore/:id", (req, res) => {
  const { id } = req.params
  console.log(id)

  User.findById({ _id: id })
  .then(user => {
    console.log("User data following:")
    
    Inventory.find({
      $and: [
        { gender: user.gender },
        { $or: [ { category: user.wishlist[0].category },
                 { category: user.wishlist[1].category },
                 { category: user.wishlist[2].category }
          ]}
        
      ]
    })
    .then(data => {
      console.log('working with res')
      console.log(data)
      res.json(data)
    })
    .catch(err => console.log(err))
  })
})

router.post("/wishlist", (req, res) => {
  const { user, item } = req.body

  User.findOneAndUpdate({ _id: user._id }, {
    $push: { wishlist: item }
  }, { new: true })
  .then(data => res.json(data))
  .catch(err => console.log(err))
})

router.post("/wishlistremove", (req, res) => {
  const { user, item } = req.body
  User.findOneAndUpdate({ _id: user._id },  {
    $pull: { wishlist: item }
  }, { new: true })
  .then(data => res.json(data))
  .catch(err => console.log(err))
})

module.exports = router