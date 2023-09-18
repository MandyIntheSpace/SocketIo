const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUser,
} = require("../controller/userController");
const { authMiddlerware } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/search").get(authMiddlerware, allUser);

module.exports = router;
