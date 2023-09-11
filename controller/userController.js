const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const generateToken = require('../config/generateToken')
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {

        throw new Error("Please Enter all fields")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json({
            messsage: "User already exists"
        })
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            pic: user.pic,
            gnerateToken: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Failed to create the user")
    }

})

module.exports = { registerUser }