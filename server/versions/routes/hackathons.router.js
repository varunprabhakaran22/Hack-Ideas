const express = require("express");
const router = express.Router();
const hackathonsController = require("../controllers/hackathons.controller");
// const { checkToken } = require("../../../utils/jwt");

router.get("/", hackathonsController.getHackathonsData);
router.post("/create", hackathonsController.createHackathonsData);
router.put("/update", hackathonsController.updateHackathonsData);
router.delete("/delete", hackathonsController.deleteHackathonsData);

module.exports = router;
