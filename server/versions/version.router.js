const express = require("express");
const router = express.Router();

//Import all the routes
const hackathonsRouter = require("./routes/hackathons.router");
const userRouter = require("./routes/user.router");

//Main route
router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths
router.use("/product", hackathonsRouter);
router.use("/user", userRouter);

module.exports = router;
