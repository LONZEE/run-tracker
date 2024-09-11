const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./User"); // Ensure this path is correct
const dotenv = require('dotenv');
const port = process.env.PORT || 5001;
const app = express();


dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function() {
    console.log('Connected to MongoDB');
}).on('error', function(error){
    console.log('Connection error:', error);
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

app.get("/api/entries/:username", async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).send("Username is required!");
  }
  try {
    const userEntries = await User.findOne({ username }).populate('entries');
    if (!userEntries) {
      return res.status(404).send("User not found!");
    }
    res.status(200).send({ success: true, entries: userEntries.entries });
  } catch (error) {
    res.status(500).send("An error occurred while fetching entries!");
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});