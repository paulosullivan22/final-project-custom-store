const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Inventory = require("../models/Inventory")

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/final-project-custom-store', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    profileImg: "https://static1.squarespace.com/static/55550428e4b0d770e3f981ab/t/5c8485c0f4e1fc79d4f506b7/1531332941077/Happy+Hour+Headshot+Philadelphia+Headshots?format=1000w"
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

let inventoryItems = [
  {
    itemName: "Dr Martens 8-Eye",
    itemType: "Mens boots"
  },
  {
    itemName: "Raybans",
    itemType: "Sunglasses"
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

Inventory.deleteMany()
  .then(() => {
    return Inventory.create(inventoryItems)
  })
  .then(itemsCreated => {
    console.log(`${itemsCreated.length} inventory items added with the following id:`)
    console.log(itemsCreated.map(i => i._id))
  })
  .then(() => {
    mongoose.disconnect()
  })