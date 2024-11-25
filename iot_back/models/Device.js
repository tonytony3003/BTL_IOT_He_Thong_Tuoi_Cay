const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  connectedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  mode: { type: String, enum: ["manual", "auto"], default: "manual" },
  pumpState: { type: Boolean, default: false },
  soilMoisture: { type: Number, default: 0 },
  upperThreshold: { type: Number, default: 700 },
  lowerThreshold: { type: Number, default: 300 },
});

module.exports = mongoose.model("Device", deviceSchema);
