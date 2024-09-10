const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5001; // Changed port from 5000 to 3000


const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://edalopez90:HpUCam2el4IBjagR@rundata.6nuj1.mongodb.net/?retryWrites=true&w=majority&appName=RunData");

const runSchema = new mongoose.Schema({
  miles: String,
  pace: String,
  time: String,
  heart: String,
});

const Run = mongoose.model("Run", runSchema);

// POST route to add run data to MongoDB
app.post("/api/runs", async (req, res) => {
  const newRun = new Run(req.body);
  await newRun.save();
  res.status(201).send("Run data saved successfully!");
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
