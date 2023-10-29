const express = require("express");
const router = express.Router();


const isLoggedIn = require("../middlewares/isLoggedIn")
const {getSecrets,postSecrets, deleteSecret, updateSecret} = require("../controllers/secretControler");

router.route('/getsecrets').post(isLoggedIn, getSecrets);
router.route('/postsecrets').post(isLoggedIn, postSecrets);
router.route('/deletesecret').post(isLoggedIn, deleteSecret);
router.route('/updatesecrets').post(isLoggedIn, updateSecret);

module.exports = router;