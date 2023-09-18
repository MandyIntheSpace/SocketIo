const express = require("express");
const router = express.Router();
const { authMiddlerware } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controller/chatController");

router.post("/access", authMiddlerware, accessChat);
router.get("/fetchChat", authMiddlerware, fetchChat);
router.post("/groupChat", authMiddlerware, createGroupChat);
router.put("/rename", authMiddlerware, renameGroup);
router.put("/addMember", authMiddlerware, addToGroup);
router.put("/removeMember", authMiddlerware, removeFromGroup);

module.exports = router;
