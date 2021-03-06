require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session); 

require('./passport');

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/final-project-custom-store", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:false}));
app.use(cookieParser());

// Express View engine setup
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// Session settings:

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ 
    mongooseConnection: mongoose.connection,
    ttl: 25 * 60 * 60 
  })
}));

// Passport details
app.use(passport.initialize())
app.use(passport.session())


const index = require("./routes/index");
app.use("/", index);

const store = require("./routes/store") 
app.use("/api/store", store)

const auth = require('./routes/auth')
app.use('/api/auth/', auth)

const fileUpload = require('./routes/fileUpload')
app.use('/api', fileUpload)

app.use((req, res) => {
  // If no routes match, send the React HTML.
  res.sendFile(__dirname + "/client/build/index.html");
});

module.exports = app;