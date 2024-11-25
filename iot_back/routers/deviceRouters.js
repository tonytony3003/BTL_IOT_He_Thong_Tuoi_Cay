const express = require("express");
const { getDeviceStatus, updateDeviceStatus } = require("../controllers/deviceController");
const router = express.Router();

router.get("/", getDeviceStatus);
router.post("/update", updateDeviceStatus);

module.exports = router;
