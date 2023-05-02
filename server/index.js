const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const server = require("http").createServer(app)
const PORT = 5000;
const cors = require("cors")

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());

app.get("/", (req,res) => {
    console.log("Home route")
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () =>{
        socket.broadcast.emit("call-ended")
    })

    socket.on("call-user", ({ userToCall, signalData, from, name}))
})

app.listen(PORT, () => {
    console.log(`Server started listening at port ${PORT}`)
})

