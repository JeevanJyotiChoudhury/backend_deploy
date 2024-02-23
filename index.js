const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { audioRoutes } = require("./routes/audio.route");

const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // intercept OPTIONS method
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/api/audios", audioRoutes);

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Server running at port 8080");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    console.log("Something went wrong");
  }
});
