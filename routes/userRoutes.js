const express = require("express");
const router = express.Router();


const isLoggedIn = require("../middlewares/isLoggedIn")
const {signup,login,logout, logedin, deleteUser, verifyUser} = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route('/logout').get(logout);
router.route('/logout').post(logout);

router.route('/logedin').post(isLoggedIn, logedin);

router.route('/deleteuser').post(isLoggedIn, deleteUser);

router.route("/verifyemail").post(verifyUser);

module.exports = router;