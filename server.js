const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const dotenv = require('dotenv')
const { chats } = require('./data/data')
const cors = require('cors')

const app = express()
dotenv.config()

app.use(cors())



app.get("/", (req, res) => {
    res.status(200).json({
        message: "The first get method has successfully started"
    })
})

app.get("/api/chat", (req, res) => {
    res.status(200).send(chats)
})

app.get("/api/chat/:id", (req, res) => {
    const singleChats = chats.find((c) => c._id === req.params.id)
    res.send(singleChats)
})

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`The app has starterd on the port ${port}`)
}) 