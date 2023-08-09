const express = require("express");
const router = express.Router();
const {register, profile , login, logout} = require("../controllers/auth");
const {getAccessToRoute} = require("../middlewares/auth/auth");


router.post("/register" , register);
router.post("/login" , login);
router.get("/profile" ,getAccessToRoute,  profile);
router.get("/logout" ,getAccessToRoute,  logout);

module.exports = router;