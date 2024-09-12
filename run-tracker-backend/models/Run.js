const mongoose = require("mongoose");

const runSchema = new mongoose.Schema({
    distance: { type: Number, required: true },
    time: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    heartRate: { type: Number, required: true },
    });

module.exports = mongoose.model("Run", runSchema);
