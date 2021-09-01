const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { checkToken } = require("../../utils/jwt.util");

router.post("/signup", userController.saveSignUpDetails);
router.post("/login", userController.getloginDetails);

module.exports = router;
