const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    prerequisites: [{ type: String }],
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
  },
  {
    versionKey: false,
  }
);

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = {
  CourseModel,
};
