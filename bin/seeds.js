const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Inventory = require("../models/Inventory")

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/final-project-custom-store', {useNewUrlParser: true})
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
    gender: "Female",
    profileImg: "https://static1.squarespace.com/static/55550428e4b0d770e3f981ab/t/5c8485c0f4e1fc79d4f506b7/1531332941077/Happy+Hour+Headshot+Philadelphia+Headshots?format=1000w"
  },
  {
    username: "bob",
    gender: "Male",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]

let inventoryItems = [
  {
    name: "Italian Twill Stand-Up Collar Shirt",
    category: "Shirt",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 30,
    color: "Grey",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C84543-23M-20-116.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C84543-23M-20-116.jpg"
  },
  {
    name: "Poplin Shirt - White",
    category: "Shirt",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 25,
    color: "White",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C84102-25S-30-200.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C84102-25S-30-200.jpg"
  },
  {
    name: "Poplin Shirt - Frosted Sage",
    category: "Shirt",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 28,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C84102-25S-30-670.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C84102-25S-30-670.jpg"
  },
  {
    name: "Slub Jersey Longsleeve",
    category: "Shirt",
    size: ["S", "M", "L"],
    gender: "Male",
    ageRange: 35,
    color: "White",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C85132-40S-26-218.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C85132-40S-26-218.jpg"
  },
  {
    name: "Raglan Sweatshirt",
    category: "Shirt",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 25,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C85213-47A-55-687.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C85213-47A-55-687.jpg"
  },
  {
    name: "Clifton Slim Chino - Obsidian",
    category: "Pants",
    size: ["30", "32", "34", "36"],
    gender: "Male",
    ageRange: 27,
    color: "Grey",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/CXX200-30G-01-190.jpg",
    image2: "https://cdn.closed.com/generated/product/5/540_810_85/CXX200-30G-01-190.jpg"
  },
  {
    name: "Clifton Slim Chino - Faded Green",
    category: "Pants",
    size: ["30", "32", "34", "36"],
    gender: "Male",
    ageRange: 27,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/CXX200-30G-01-674.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/CXX200-30G-01-674.jpg"
  },
  {
    name: "Clifton Slim Chino - China Blue",
    category: "Pants",
    size: ["30", "32", "34", "36"],
    gender: "Male",
    ageRange: 27,
    color: "Blue",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/CXX200-30G-01-524.jpg",
    image2: "https://cdn.closed.com/generated/product/5/540_810_85/CXX200-30G-01-524.jpg"
  },
  {
    name: "Clifton Slim Chino - Sand",
    category: "Pants",
    size: ["30", "32", "34", "36"],
    gender: "Male",
    ageRange: 27,
    color: "Beige",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/CXX200-30J-22-208.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/CXX200-30J-22-208.jpg"
  },
  {
    name: "Jacquard Cardigan",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 34,
    color: "Beige",
    image: "https://cdn.closed.com/generated/product/6/540_810_85/C86303-98U-JC-255.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C86303-98U-JC-255.jpg"
  },
  {
    name: "Pure Wool Sweater",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 30,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C86177-98U-22-692.jpg",
    image2: "https://cdn.closed.com/generated/product/8/540_810_85/C86177-98U-22-692.jpg"
  },
  {
    name: "Merino Wool Fine Knit Sweater",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 37,
    color: "Black",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C86685-92W-22-568.jpg",
    image2: "https://cdn.closed.com/generated/product/6/540_810_85/C86685-92W-22-568.jpg"
  },
  {
    name: "Cashmere Sweater",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    gender: "Male",
    ageRange: 35,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C86500-99L-22-670.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C86500-99L-22-670.jpg"
  },
  {
    name: "Unity Slim Jeans - Blue",
    category: "Pants",
    size: ["30", "32", "34", "36"],
    gender: "Male",
    ageRange: 30,
    color: "Blue",
    image: "https://cdn.closed.com/generated/product/2/540_810_85/CXX102-0EA-8A-DBL.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/CXX102-05Y-2D-MBL.jpg"
  },
  {
    name: "Unity Slim Jeans - Black",
    category: "Pants",
    size: ["30", "32", "34", "36"],
    gender: "Male",
    ageRange: 30,
    color: "Black",
    image: "https://cdn.closed.com/generated/product/2/540_810_85/CXX102-0EU-9B-BBK.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/CXX102-0EU-9B-BBK.jpg"
  },
  {
    name: "Widey Wide Jeans",
    category: "Pants",
    size: ["28", "30", "32", "34"],
    gender: "Male",
    ageRange: 30,
    color: "Black",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/CXX340-10C-20-DBL.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/CXX340-10C-20-DBL.jpg"
  },
  {
    name: "Suede Sneaker - Fox Brown",
    category: "Shoes",
    size: ["40", "41", "42", "43", "44", "45"],
    gender: "Male",
    ageRange: 30,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C89301-88F-22-930.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/C89301-88F-22-930.jpg"
  },
  {
    name: "Leather Runner - Dark Night",
    category: "Shoes",
    size: ["40", "41", "42", "43", "44", "45"],
    gender: "Male",
    ageRange: 30,
    color: "Navy",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C89100-77T-22-568.jpg",
    image2: "https://cdn.closed.com/generated/product/5/540_810_85/C89100-77T-22-568.jpg"
  },
  {
    name: "Suede Sneaker - Dark Night",
    category: "Shoes",
    size: ["40", "41", "42", "43", "44", "45"],
    gender: "Male",
    ageRange: 30,
    color: "Navy",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C89301-88F-22-568.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/C89301-88F-22-568.jpg"
  },
  {
    name: "Desert Boots",
    category: "Shoes",
    size: ["40", "41", "42", "43", "44", "45"],
    gender: "Male",
    ageRange: 30,
    color: "Navy",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C89543-87B-22-524.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/C89543-87B-22-524.jpg"
  },
  {
    name: "Shearling Reversible Coat - Tobacco",
    category: "Outerwear",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 32,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C97930-82D-22-928.jpg",
    image2: "https://cdn.closed.com/generated/product/8/540_810_85/C97930-82D-22-928.jpg"
  },
  {
    name: "Shearling Reversible Coat - Linen",
    category: "Outerwear",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 26,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C97930-82D-22-299.jpg",
    image2: "https://cdn.closed.com/generated/product/5/540_810_85/C97930-82D-22-299.jpg"
  },
  {
    name: "Shearling Reversible Coat - Black",
    category: "Outerwear",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 26,
    color: "Black",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C97930-82D-22-100.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/C97930-82D-22-100.jpg"
  },
  {
    name: "Bomber Jacket",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 28,
    color: "Red",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C97173-67E-22-333.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C97173-67E-22-333.jpg"
  },
  {
    name: "Cashmere Short-Sleeved Sweater",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 34,
    color: "Black",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C96587-99C-22-568.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/C96587-99C-22-568.jpg"
  },
  {
    name: "Heavy Knit Sweater with Block Stripes",
    category: "Outerwear",
    size: ["XS", "S", "M", "L"],
    gender: "Female",
    ageRange: 24,
    color: "White",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C96022-98E-ST-463.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/C96022-98E-ST-463.jpg"
  },
  {
    name: "Merino Wool & Cashmere Cardigan",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 28,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/3/540_810_85/C96608-922-22-667.jpg",
    image2: "https://cdn.closed.com/generated/product/1/540_810_85/C96608-922-22-667.jpg"
  },
  {
    name: "Crew Neck Sweater",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 34,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/3/540_810_85/C96180-98E-22-974.jpg",
    image2: "https://cdn.closed.com/generated/product/1/540_810_85/C96180-98E-22-974.jpg"
  },
  {
    name: "Longshirt - Caper Green",
    category: "Shirt",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 26,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/2/540_810_85/C95444-454-CH-667.jpg",
    image2: "https://cdn.closed.com/generated/product/4/540_810_85/C95442-454-CH-667.jpg"
  },
  {
    name: "Stand-Up Collar Blouse",
    category: "Shirt",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 24,
    color: "Navy",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C94799-23K-EM-568.jpg",
    image2: "https://cdn.closed.com/generated/product/6/540_810_85/C94799-23K-EM-568.jpg"
  },
  {
    name: "Oversized Denim Dress",
    category: "Dress",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 32,
    color: "Navy",
    image: "https://cdn.closed.com/generated/product/6/540_810_85/C98308-19S-2B-BBK.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C98308-19S-2B-BBK.jpg"
  },
  {
    name: "Shirt Dress",
    category: "Dress",
    size: ["XXS", "XS", "S", "M", "L", "XL"],
    gender: "Female",
    ageRange: 34,
    color: "Red",
    image: "https://cdn.closed.com/generated/product/6/540_810_85/C98016-25P-30-974.jpg",
    image2: "https://cdn.closed.com/generated/product/7/540_810_85/C98016-25P-30-974.jpg"
  },
  {
    name: "Velvet Pants Baker Long",
    category: "Pants",
    size: ["24", "25", "26", "27", "28", "30"],
    gender: "Female",
    ageRange: 28,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/2/540_810_85/C91883-39K-14-928.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/C91883-39K-14-928.jpg"
  },
  {
    name: "Stewart Satin Pants",
    category: "Pants",
    size: ["24", "25", "26", "27", "28", "30"],
    gender: "Female",
    ageRange: 28,
    color: "Green",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C91796-31U-30-667.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/C91796-31U-30-667.jpg"
  },
  {
    name: "Jack Satin Pants",
    category: "Pants",
    size: ["24", "25", "26", "27", "28", "30"],
    gender: "Female",
    ageRange: 28,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/5/540_810_85/C91012-31U-30-287.jpg",
    image2: "https://cdn.closed.com/generated/product/1/540_810_85/C91012-31U-30-287.jpg"
  },
  {
    name: "Dayton Check Pants",
    category: "Pants",
    size: ["24", "25", "26", "27", "28", "30"],
    gender: "Female",
    ageRange: 30,
    color: "Brown",
    image: "https://cdn.closed.com/generated/product/3/540_810_85/C91533-36D-22-568.jpg",
    image2: "https://cdn.closed.com/generated/product/4/540_810_85/C91533-36D-22-568.jpg"
  },
  {
    name: "Leather Runner - White",
    category: "Shoes",
    size: ["36", "37", "38", "39", "40", "41"],
    gender: "Female",
    ageRange: 26,
    color: "White",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C99136-87A-22-200.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/C99136-87A-22-200.jpg"
  },
  {
    name: "Suede Runner - Red Pepper",
    category: "Shoes",
    size: ["36", "37", "38", "39", "40", "41"],
    gender: "Female",
    ageRange: 26,
    color: "Red",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C99136-87C-22-333.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/C99136-87C-22-333.jpg"
  },
  {
    name: "Suede & Textile Runner",
    category: "Shoes",
    size: ["36", "37", "38", "39", "40", "41"],
    gender: "Female",
    ageRange: 26,
    color: "White",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C99102-883-22-188.jpg",
    image2: "https://cdn.closed.com/generated/product/2/540_810_85/C99102-883-22-188.jpg"
  },
  {
    name: "Leather Sneaker - White",
    category: "Shoes",
    size: ["36", "37", "38", "39", "40", "41"],
    gender: "Female",
    ageRange: 26,
    color: "White",
    image: "https://cdn.closed.com/generated/product/1/540_810_85/C99004-87E-22-200.jpg",
    image2: "https://cdn.closed.com/generated/product/3/540_810_85/C99004-87E-22-200.jpg"
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
  .catch(err => {
    console.log(err)
    mongoose.disconnect()
  })