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
        console.log("AWS received request")
        if (err) return res.json({ message: "Sorry, that photo didn't come up as a match for the account holder."})

        if (!data || !data.FaceMatches.length ) {
          return res.json({ 
            message: "Sorry, there aren't any faces in this photo that match the account holder." 
          })
        } else if (data.FaceMatches[0].Similarity > 95) {
          console.log("face match successfuly")
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
        return res.json({ message: "Please provide valid credentials."})
      }

      if (bcrypt.compareSync(password, user.password)) {
        console.log("valid session")
        req.session.currentUser = user
        console.log(req.session.currentUser)
       
        req.login(user,() => res.json(user))
      } else {
        console.log("password error")
        return res.json({ message: "Please provide valid credentials."})
      }
    })
    .catch(err => next(err))
})

router.post("/localsignup", (req, res, next) => {
  const { username, gender, password } = req.body

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
      gender,
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

    const app = new Clarifai.App({
      apiKey: process.env.clarifaiApiKey
    });

    noFaceDetected = () => {
      return res.json({ message: "Sorry, there was no face detected in this photo."})
    }

    newUserLogin = (newUser) => {
      newUser.save().then(user=>{
        req.login(user,() => res.json(user))
      })
    }

    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", profileImg)
      .then(res => {

        console.log("Clarifai face data: ")
        if (!res.outputs[0].data.regions) return noFaceDetected()
        const ageData = res.outputs[0].data.regions[0].data.face.age_appearance.concepts;
        const age = Math.round(ageData.map(age => parseInt(age.name)).reduce((acc, val) => acc + val)/ageData.length)

        let gender = res.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name
        if (gender === "masculine") gender = "Male"
        else gender = "Female"

        const newUser = new User({
          username,
          profileImg,
          age,
          gender
        });

        newUserLogin(newUser)
      })
      .catch(err => {
        console.log("Error creating user" + err)
        res.json({ message: "Uh oh, something went wrong."})
      })
    }
  )
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
