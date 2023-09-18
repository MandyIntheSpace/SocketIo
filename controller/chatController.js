const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

const accessChat = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId params not sent with the request");
      res.sendStatus(400);
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })

      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
          "users",
          "-password"
        );

        res.send(200).send(fullChat);
      } catch (error) {
        res.send(400).send("The sresource not created");
      }
    }
  } catch (error) {
    console.log(`Erro While Handling the Chat: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  try {
    let foundChat = await Chat.find({
      users: {
        $elemMatch: {
          $eq: req.user._id,
        },
      },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          send: "name pic email",
        });
        res.status(200).send(result);
      });
  } catch (error) {
    console.log(`The error is ${error}`);
    res.send(400).send("Internal Server Error");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({
      message: "Please kindly fill out all the form",
    });
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    res.status(400).send("Please add more users");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      groupAdmin: req.user,
      isGroupChat: true,
    });

    const fullChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName, isModifiedNew } = req.body;
  const renameChatGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
      isModifiedNew: true,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!renameChatGroup) {
    res.status(400);
    throw new Error("Nothing Found!!!!");
  } else {
    res.status(200).json(renameChatGroup);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const findChat = await Chat.findById(chatId);

  if (!findChat) {
    return res.status(404).send("The chat not found");
  }

  if (findChat.users.includes(userId)) {
    return res.status(400).send("The user already exists in the user array");
  }

  const addNewMember = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: {
        users: userId,
      },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(addNewMember);
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const findChat = await Chat.findById(chatId);
  if (!findChat) {
    return res.status(404).status(`Chat not found with chat id ${chatId}`);
  }

  if (!findChat.users.includes(userId)) {
    return res
      .status(400)
      .send(
        `The user not found in the existing user arry with the user id ${userId}`
      );
  }

  const removeMember = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: {
        users: userId,
      },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(removeMember)
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
