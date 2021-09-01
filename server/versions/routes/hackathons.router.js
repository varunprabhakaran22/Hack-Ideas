const express = require("express");
const router = express.Router();
const hackathonsController = require("../controllers/hackathons.controller");
const { checkToken } = require("../../utils/jwt.util");

router.get("/", hackathonsController.getHackathonsData);
router.post("/create",checkToken, hackathonsController.createHackathon);
router.put("/update",checkToken, hackathonsController.updateHackathonsData);
router.delete("/delete", hackathonsController.deleteHackathonsData);

module.exports = router;
