const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "student" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    versionKey: false,
  }
);

const StudentModel = mongoose.model("Student", studentSchema);

module.exports = {
  StudentModel,
};
