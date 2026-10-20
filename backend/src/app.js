const express = require('express');
const { createServer } = require('http'); // Correctly import createServer

const mongoose = require('mongoose');
const cors = require('cors');
const { connectToSocket } = require('./controllers/socketManager.js'); // Import the connectToSocket function
const userRoutes = require('./routes/user.routes.js');
const app = express();


// 1. Create an HTTP server and pass the Express app to it
const httpServer = createServer(app);

// 2. Attach Socket.io to the HTTP server
const io = connectToSocket(httpServer);
  


// Middleware
app.set("port",process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("Hello world 1")
app.use('/api/users', userRoutes); // Use the user routes



// Routes
app.get('/home', (req, res) => {
    return res.json({
        message: "Welcome to LinguaMeet AI"
    });
});

// Socket.io connection test


const start = async () => {
    try {
        
        const connectionDB = await mongoose.connect(
            "mongodb://localhost:27017/MeetingsDB"
        ).then(() => {
            console.log("Database connected successfully");
        }).catch((error) => {
            console.error("Database connection error:", error);
            process.exit(1); // Exit the process with an error code
        });

      

        httpServer.listen(app.get("port"), () => {
            console.log(`Server is running on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

start();

// 3. Start the httpServer (NOT app.listen)
