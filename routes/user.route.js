const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

//register
userRouter.post("/register", async (req, res) => {
  const { name, userName, email, phone, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exist, please login" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const user = new UserModel({
        name,
        userName,
        email,
        phone,
        password: hash,
      });
      await user.save();
      res.status(200).json({ msg: "New user has been added", newUser: user });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ user: user.email }, "TOKEN", {
            expiresIn: "5d",
          });
          res.json({ msg: "User logged in successfully.", token });
        } else {
          res.json({ msg: "Wrong credentials" });
        }
      });
    } else {
      res.json({ msg: "User not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = {
  userRouter,
};
