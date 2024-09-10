const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./User"); // Ensure this path is correct

const port = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://edalopez90:HpUCam2el4IBjagR@rundata.6nuj1.mongodb.net/?retryWrites=true&w=majority&appName=RunData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// GET route to retrieve run data from MongoDB
app.get("/api/runs", async (req, res) => {
  const runs = await Run.find();
  res.status(200).send(runs);
});

// POST route to register a new user
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required!");
  }
  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send("Username already exists!");
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send({ success: true });
  }
});

// POST route to login a user
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required!");
  }
  const user = await User.findOne({ username, password });
  if (user) {
    res.status(200).send({ success: true, user });
  } else {
    res.status(400).send("Invalid username or password!");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});