const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/AuthController.js");
const usercontroller = require("../controllers/UserController.js");
const adscontroller = require("../controllers/AdsController.js");
const Auth = require("../middlewares/Auth.js");
const AuthValidator = require('../validators/AuthValidator.js');
const UserValidator = require("../validators/UserValidator.js");

router.get("/ping", (req, res) => {
  res.json({ pong: "true" });
});

router.get("/states", usercontroller.getStates);
router.get("/user/me", Auth.private, usercontroller.me);
router.put("/user/me",UserValidator.editAction ,Auth.private, usercontroller.editAction);

router.post("/user/signin", AuthValidator.signin,authcontroller.signin);
router.post("/user/signup", AuthValidator.signup,authcontroller.signup);

router.get("/categories", adscontroller.categories);

router.post("/ad/add", Auth.private, adscontroller.ad);
router.get("/ad/list", adscontroller.getList);
router.get("/ad/item", adscontroller.getItem);
router.post("/ad/:id", Auth.private, adscontroller.editAction);

module.exports = router;
