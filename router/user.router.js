const express = require("express");
const userModel = require("../models/user.model");
const userrouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
userrouter.post("/register", async (req, res) => {
   
  const { name, email, password } = req.body;
  if (password) {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(404).json({ message: err.message });
      } else {
        try {
          const userbcrpt = { name, email, password: hash };
          const user = new userModel(userbcrpt);
          const userregister = await user.save();
          res.json({ message: "user registed", userregister });
        } catch (error) {
          res.status(404).json({ message: error });
        }
      }
    });
  } else {
    res.status(404).json({ message: "password must be at least" });
  }
});
userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email || password) {
    const userfind = await userModel.findOne({email});
    console.log(userfind)
    if (userfind) {
      bcrypt.compare(password,userfind.password, async (err, result) => {
        if (err) {
          res.status(404).json({ error: err.message });
        } else if (result) {
          const token = jwt.sign({ userId:userfind._id,userName:userfind.name},process.env.SECRATE_KEY,{expiresIn:"5days"});
          const rtoken = jwt.sign({ email},process.env.SECRATE_KEY_REFRESH,{expiresIn:"7days"});
          res.json({ token,rtoken });
        } else {
          res.status(404).json({ error: "wrong credentials" });
        }
      });
    } else {
      res.status(404).json({ error: "enter password or email address   " });
    }
  }
});

module.exports = userrouter;
