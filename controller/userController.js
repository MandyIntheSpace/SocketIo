const asyncHandler = require('express-async-handler')
const UserModel = require('../Models/userModel')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {

        throw new Error("Please Enter all fields")
    }

    const userExists = await UserModel.findOne({ email })

    if (userExists) {
        res.status(400).json({
            messsage: "User already exists"
        })
        return;
    }

})