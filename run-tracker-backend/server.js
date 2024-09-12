const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user"); // Ensure this path is correct
const authRoutes = require("./routes/auth"); // Ensure this path is correct
const runRoutes = require("./routes/runs"); // Ensure this path is correct
const dotenv = require('dotenv');
const port = process.env.PORT || 5001;
const app = express();


dotenv.config();
// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function () {
  console.log('Connected to MongoDB');
}).on('error', function (error) {
  console.log('Connection error:', error);
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/runs", runRoutes);
app.use("/api/users", userRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});