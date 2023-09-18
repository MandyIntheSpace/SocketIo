const express = require("express");
const router = express.Router();
const { authMiddlerware } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
} = require("../controller/chatController");

router.post("/access", authMiddlerware, accessChat);
router.get("/fetchChat", authMiddlerware, fetchChat);
router.post("/groupChat", authMiddlerware, createGroupChat);
// router.post(authMiddlerware, renameGroup)
// router.put(authMiddlerware, removeFromGroup)
// router.put(authMiddlerware, addToGroup)

module.exports = router;
