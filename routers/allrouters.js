const express = require("express");
const router = express.Router();


const authrouter = require("./auth");
const questionsrouter = require("./question");

router.use("/auth", authrouter);
router.use("/questions", questionsrouter);



module.exports = router;