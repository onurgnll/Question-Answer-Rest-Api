const express = require("express");
const router = express.Router();
const {getAllQuestions} = require("../controllers/questions");


router.get("/", getAllQuestions);



module.exports = router;