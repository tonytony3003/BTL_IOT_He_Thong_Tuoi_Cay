const Device = require("../models/Device");

const getDeviceStatus = async (req, res) => {
  try {
    const device = await Device.findOne();
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDeviceStatus = async (req, res) => {
  try {
    const { mode, pumpState, upperThreshold, lowerThreshold, soilMoisture } = req.body;
    const device = await Device.findOneAndUpdate(
      {},
      { mode, pumpState, upperThreshold, lowerThreshold, soilMoisture },
      { new: true, upsert: true }
    );
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDeviceStatus, updateDeviceStatus };
