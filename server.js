const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
dotenv.config();

app.use(cors());

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 6000;

const server = app.listen(port, () => {
  console.log(`The app has starterd on the port ${port}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 600000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to the socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    console.log(userData.name);
    socket.emit("connected");

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log(`User Joined the room ${room}`);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceive) => {
      let chat = newMessageReceive.chat;
      if (!chat.users) return console.log("chat users not defined");
      chat.users.forEach((user) => {
        if (user._id == newMessageReceive.sender._id) return;
        socket.in(user._id).emit("message recived", newMessageReceive);
      });
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED!!!!");
      socket.leave(userData._id)
    })

  });
});
