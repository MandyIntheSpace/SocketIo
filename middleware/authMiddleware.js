const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')

const authMiddlerware = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            console.log("here")
            next()

        } catch (err) {
            res.status(401)
            throw new Error('Not Authorized. Authentication Failed')
        }
    }

    if (!token) {
        return res.status(401).send('Unauthorized')
    }

})

module.exports = { authMiddlerware }