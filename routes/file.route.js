const express = require("express");
const multer = require("multer");

const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    cb(null, code + "-" + file.originalname);
  },
});

const upload = multer({ storage });

fileRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Save file details to the database
    const { originalname, filename } = req.file;
    const { user } = req.body; // Assuming you have user information in the request body or session

    const newFile = await FileModel.create({
      user,
      fileName: originalname,
      code: filename.split("-")[0], // Extracting the 6-digit code from the filename
    });

    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

fileRouter.get("/list/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch files for the specific user
    const files = await FileModel.find({ user: userId });

    res.json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

fileRouter.delete("/delete/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;

    // Find the file in the database
    const fileToDelete = await FileModel.findById(fileId);

    if (!fileToDelete) {
      return res.status(404).json({ error: "File not found" });
    }

    // Delete the file from the file system
    const filePath = path.join("./uploads", fileToDelete.fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to delete file from the file system" });
      }

      // Delete the file from the database
      FileModel.findByIdAndDelete(fileId, (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Failed to delete file from the database" });
        }

        res.json({ message: "File deleted successfully" });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

fileRouter.get("/download/:fileId/:code", async (req, res) => {
  try {
    const { fileId, code } = req.params;

    // Validate the 6-digit code
    const file = await FileModel.findById(fileId);

    if (!file || file.code !== code) {
      return res.status(403).json({ error: "Invalid access code" });
    }

    // Implement logic to send the file for download
    const filePath = path.join("./uploads", file.fileName);

    res.download(filePath, file.fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to download file" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  fileRouter,
};