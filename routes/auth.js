const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/login', (req, res) => {
  console.log("Request received")
  User.findOne({ username: req.body.username }, (err, user) => {
    console.log("Request processed")
    if (!user) {
      console.log("no user exists")
      return res.json({ message: "This username does not exist"})
    }
    else return res.json(user)
  })
})

// router.post("/login", (req, res) => {
//   passport.authenticate("local", (err, user) => {
//     if (err) {
//       return res.status(500).json({ message: "Error while authenticating" });
//     } else if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     req.login(user, err => {
//       if (err) {
//         return res
//           .status(500)
//           .json({ message: "Error while attempting to login" });
//       }

//       return res.status(200).json(user);
//     });
//   })(req, res);
// });

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body

  if (username === "" || password === "") {
    return res.status(400).json({ message: "Please submit both fields."});
  } else if (password.length < 8) {
    return res.status(400).json({ message: "Password must be minimum 8 characters"})
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.json({ message: "This username is already taken."})
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save().then(user=>{
      req.login(user,()=>res.json(user))
    })
      
    .catch(err => {
      console.log("Error creating user" + err)
      res.json({ message: "Uh oh, something went wrong."})
    })
  });
});

router.post("/logout", (req, res) => {
  console.log('logout route working')
  req.logout();
  res.status(200).json({ message: "User was successfully logged out"})
});

router.get("/loggedin", (req, res) => {
  res.json(req.user)
})

module.exports = router;
