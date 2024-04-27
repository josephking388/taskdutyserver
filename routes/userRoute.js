const express = require("express");
const router = express.Router();
const {registration,login,isLoggedin} = require('../controllers/userController');


// register route
router.post("/register",registration);

//login route
router.post('/login', login)
router.get('/isloggedin',isLoggedin)


  module.exports = router