const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { audioRoutes } = require("./routes/audio.route");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/api/audios", audioRoutes);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server running at port 8080");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
});
