const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/AuthController");
const usercontroller = require("../controllers/UserController");
const adscontroller = require("../controllers/AdsController");
const Auth = require("../middlewares/Auth");
const AuthValidator = require('../validators/AuthValidator');

router.get("/ping", (req, res) => {
  res.json({ pong: "true" });
});

router.get("/states", usercontroller.getStates);
router.get("/user/me", Auth.private, usercontroller.me);
router.put("/user/me", Auth.private, usercontroller.editAction);

router.post("/user/signin", AuthValidator.signin,authcontroller.signin);
router.post("/user/signup", AuthValidator.signup,authcontroller.signup);

router.get("/categories", adscontroller.categories);

router.post("/ad/add", Auth.private, adscontroller.ad);
router.get("/ad/list", adscontroller.getList);
router.get("/ad/item", adscontroller.getItem);
router.post("/ad/:id", Auth.private, adscontroller.editAction);

module.exports = router;
