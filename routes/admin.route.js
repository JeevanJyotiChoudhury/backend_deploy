const express = require("express");
const { CourseModel } = require("../models/course.model");
const { LectureModel } = require("../models/lecture.model");

const router = express.Router();

router.post("/courses", async (req, res) => {
  const { name, description, prerequisites } = req.body;
  try {
    const course = new CourseModel({ name, description, prerequisites });
    await course.save();
    res.status(200).json({ course });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/lectures", async (req, res) => {
  const { title, description, startTime, endTime, course, joinLink } = req.body;
  try {
    const lecture = new LectureModel({
      title,
      description,
      startTime,
      endTime,
      course,
      joinLink,
    });
    await lecture.save();
    res.status(200).json({ lecture });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  router,
};
