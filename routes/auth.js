const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Clarifai = require('clarifai')
const AWS = require("aws-sdk")

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    return (!user) ?
       res.json({ message: "This username does not exist"}) : 
       res.json(user)
  })
})

router.post('/faciallogin', (req, res) => {
  const { image, username } = req.body

  User.findOne({ username }, (err, user) => {
    if (err) console.log(err)

    const S3image = user.profileImg.split('/').reverse()[0]
    
    var params = {
      SimilarityThreshold: 90, 
      SourceImage: {
        Bytes: Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      }, 
      TargetImage: {
      S3Object: {
        Bucket: "project3profileimages", 
        Name: `${S3image}`
        }
      }
    };

    let rekognition = new AWS.Rekognition({ 
      accessKeyId: process.env.AWSAccessKeyId,
      secretAccessKey: process.env.AWSSecretKey,
      region: process.env.AWS_REGION
    })

    rekognition.compareFaces(params, (err, data) => {
      if (err) console.log('Error comparing faces: ' + err)

      if (!data.FaceMatches.length) return res.json({ message: "Sorry, this photo doesn't look like the account user."})

      if (data.FaceMatches[0].Similarity > 95) {
        return req.login(user, () => res.json(user))
      }
    });
  })
})

router.post("/emaillogin", (req, res) => {
  const { username, password } = req.body

  if (!username.length || !password.length) {
    return res.status(400).json({ message: "Please enter both fields"})
  }
  
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Please provide valid credentials."})
      }

      // if (bcrypt.compareSync(password, user.password)) {
        console.log("valid session")
        req.session.currentUser = user
        console.log(req.session.currentUser)
       
        req.login(user,() => res.json(user))
      // } else {
      //   console.log("password error")
      //   return res.status(401).json({ message: "Please provide valid credentials."})
      // }
    })
    .catch(err => next(err))
})

// router.post("/emaillogin", (req, res) => {
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

router.post("/localsignup", (req, res, next) => {
  const { username, password } = req.body

  if (username === "" || password === "") {
    return res.json({ message: "Please submit both fields."});
  } else if (password.length < 8) {
    return res.json({ message: "Password must be minimum 8 characters"})
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) return res.json({ message: "This username is already taken."})

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save().then(user=>{
      req.login(user,() => res.json(user))
    })
      
    .catch(err => {
      console.log("Error creating user" + err)
      res.json({ message: "Uh oh, something went wrong."})
    })
  });
});

router.post("/facialsignup", (req, res) => {
  console.log('axios request received')
  const { username, profileImg } = req.body;

  User.findOne({ username }, (err, user) => {
    if (user !== null) return res.json({ message: "This username is already taken."})

    const newUser = new User({
      username,
      profileImg
    });

    const app = new Clarifai.App({
      apiKey: process.env.clarifaiApiKey
    });

    newUserLogin = (user, userData) => {
      newUser.save().then(user=>{
        req.login(user,() => res.json({ user, userData}))
      })
    }

    console.log('facial signup working until just before clarifai request')

    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", profileImg)
      .then(res => {
        console.log('clarifai api working')
        const ageData = res.outputs[0].data.regions[0].data.face.age_appearance.concepts;
        const age = (ageData.map(age => parseInt(age.name)).reduce((acc, val) => acc + val)/ageData.length);

        const gender = res.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name

        let userData = {
            age: age,
            gender: gender
          }

        newUserLogin(user, userData)
      })
      .catch(err => {
        console.log(err)
      })
      
    .catch(err => {
      console.log("Error creating user" + err)
      res.json({ message: "Uh oh, something went wrong."})
    })
  })
})

router.post("/logout", (req, res) => {
  console.log('logout route working')
  req.logout();
  res.status(200).json({ message: "User was successfully logged out"})
});

router.get("/loggedin", (req, res) => {
  res.json(req.user)
})

module.exports = router;
