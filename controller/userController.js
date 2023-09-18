const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please Enter all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      messsage: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      pic: user.pic,
      gnerateToken: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      pic: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Username and password did not matched");
  }
});

const allUser = asyncHandler(async (req, res) => {
  try {
    const searchName = req.query.name;
    console.log(searchName);

    const regex = new RegExp(searchName, "i");

    const user = await User.find({ name: regex });

    if (!user || user.lenght === 0) {
      throw new Error("No use found.....");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      msg: err.messsage,
    });
  }
});

module.exports = { registerUser, authUser, allUser };
