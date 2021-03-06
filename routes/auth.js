const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
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

router.post("/passwordlogin", (req, res) => {
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
        req.session.currentUser = user
        console.log(req.session.currentUser)
       
        req.login(user,() => res.json(user))
      } else {
        return res.json({ message: "Please provide valid credentials."})
      }
    })
    .catch(err => next(err))
})

router.post("/passwordsignup", (req, res, next) => {
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
      req.login(user, () => res.json(user))
    })
      
    .catch(err => {
      console.log("Error creating user" + err)
      res.json({ message: "Uh oh, something went wrong."})
    })
  });
});

router.post("/facialsignup", (req, res) => {
  const { username, profileImg } = req.body;

  User.findOne({ username }, async (err, user) => {
    if (user !== null) return res.json({ message: "This username is already taken."})

    noFaceDetected = () => {
      return res.json({ message: "Sorry, there was no face detected in this photo."})
    }

    newUserLogin = (newUser) => {
      newUser.save().then(user=>{
        req.login(user,() => res.json(user))
      })
    }

    const stub = ClarifaiStub.grpc();
    const metadata = new grpc.Metadata();
    metadata.set("authorization", `Key ${process.env.clarifaiApiKey}`);

    let age
    let gender

    await stub.PostModelOutputs(
      {
          model_id: "af40a692dfe6040f23ca656f4e144fc2", // gender
          inputs: [{data: {image: {url: profileImg}}}]
      },
      {
        model_id: "36f90889189ad96c516d134bc713004d", // age
        inputs: [{data: {image: {url: profileImg}}}]
    },
      metadata,
      (err, response) => {
          if (err) {
              console.log("Error: " + err);
              return;
          }

          console.log(response.outputs[0])

          const genderPrediction = response.outputs[0].data.concepts[0].name

          if (genderPrediction === "Masculine") gender = "Male"
          else gender = "Female"
        }
  );

//   await stub.PostModelOutputs(
//     {
//         model_id: "36f90889189ad96c516d134bc713004d", // age
//         inputs: [{data: {image: {url: profileImg}}}]
//     },
//     metadata,
//     (err, response) => {
//         if (err) {
//             console.log("Error: " + err);
//             return;
//         }

//         const ageRange = response.outputs[0].data.concepts[0].name

//         console.log(ageRange)

//         age = (ageRange.split('-').map(age => parseInt(age)).reduce((acc, val) => acc + val))/2

//         console.log('age is ' + age)
//     }
// );

console.log(age)
console.log(gender)

const newUser = new User({
  username,
  profileImg,
  age,
  gender
});

newUserLogin(newUser)
    }
  )
})

router.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User was successfully logged out"})
});

router.get("/loggedin", (req, res) => {
  res.json(req.user)
})

module.exports = router;
