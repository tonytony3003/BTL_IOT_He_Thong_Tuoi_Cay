const History = require("../models/History");

const getHistory = async (req, res) => {
  try {
    const history = await History.find().populate("user", "username");
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getHistory };
