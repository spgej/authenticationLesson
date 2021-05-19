//jshint esversion:7
const express = require("express");
const ejs = require("express");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = "Iknowyoucanseethisitsjustatest";
userSchema.plugin(encrypt, {
  secret: secret,
  encryptedField: ['password']
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    email: username,
    password: password
  });

  newUser.save((err) => {
    if (!err) {
      res.render("secrets");
    }
  });
});

app.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    email: username,
  }, (err, foundUser) => {
    if (foundUser.email == username && foundUser.password === password) {
      res.render("secrets");
    };
  });
});




app.listen(3000, () => {
  console.log("Server initialized on port 3000.");
});
