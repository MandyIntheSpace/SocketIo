const express = require("express");
const router = express.Router();
const { authMiddlerware } = require("../middleware/authMiddleware");
const {sendMessages, allMessage} = require("../controller/messageController")

router.post("/storeMessage", authMiddlerware, sendMessages)
router.route("/:chatId").get(authMiddlerware, allMessage)

module.exports = router
