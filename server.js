const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const dotenv = require('dotenv')
const { chats } = require('./data/data')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express()
dotenv.config()

app.use(cors())

connectDB()


app.use("/api/user", userRoutes)


const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`The app has starterd on the port ${port}`)
}) 