const express = require('express');
const { createServer } = require('http'); // Correctly import createServer
const { Server } = require('socket.io'); // Correctly import Socket.io Server
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// 1. Create an HTTP server and pass the Express app to it
const httpServer = createServer(app);

// 2. Attach Socket.io to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Adjust this later to match your frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware
app.set("port",process.env.PORT || 3000);
app.use(cors());
app.use(express.json());


// Routes
app.get('/home', (req, res) => {
    return res.json({
        message: "Welcome to LinguaMeet AI"
    });
});

// Socket.io connection test

const start = async () => {
    const conenctionDB=await (await mongoose.connect("mongodb://localhost:27017/myApp/linguaMeetAi"));
    console.log("Database connected successfully",conenctionDB.connection.host,conenctionDB.connection.name);
    
    
    httpServer.listen(app.get("port"), () => {
        console.log(`Server is running on port ${app.get("port") }`);
    });
}

start();
// 3. Start the httpServer (NOT app.listen)
