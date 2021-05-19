//jshint esversion:6
const express = require("express");
const ejs = require("express");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
  res.render("home");
});

app.get("/login", (req, res)=>{
  res.render("login");
});

app.get("/register", (req, res)=>{
  res.render("register");
});






app.listen(3000, () => {
  console.log("Server initialized on port 3000.");
});
