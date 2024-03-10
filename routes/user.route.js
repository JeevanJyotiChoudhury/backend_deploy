const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StudentModel } = require("../models/student.model");

const studentRouter = express.Router();

studentRouter.post("/register", async (req, res) => {
  const { name, email, password, courses } = req.body;
  try {
    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Student already exist, please login" });
    }
    bcrypt.hash(password, 7, async (err, hash) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const student = new StudentModel({
        name,
        email,
        password: hash,
        courses,
      });
      await student.save();
      res
        .status(200)
        .json({ msg: "New student has been added", newStudent: student });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

studentRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await StudentModel.findOne({ email });
    if (student) {
      bcrypt.compare(password, student.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ student: student.email }, "TOKEN", {
            expiresIn: "5d",
          });
          res.json({ msg: "Student logged in successfully.", token });
        } else {
          res.json({ msg: "Wrong credentials" });
        }
      });
    } else {
      res.json({ msg: "Student not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  studentRouter,
};
