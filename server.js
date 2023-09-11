const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const dotenv = require('dotenv')
const { chats } = require('./data/data')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()
dotenv.config()

app.use(cors())

connectDB()

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`The app has starterd on the port ${port}`)
}) 