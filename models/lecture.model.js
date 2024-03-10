const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    joinLink: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const LectureModel = mongoose.model("Lecture", lectureSchema);

module.exports = {
  LectureModel,
};
