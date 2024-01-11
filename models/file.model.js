const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const FileModel = mongoose.model("File", fileSchema);

module.exports = {
  FileModel,
};
