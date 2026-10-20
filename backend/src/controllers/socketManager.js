
const { Server } = require('socket.io');

const connectToSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Restrict this to your frontend URL later
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = { connectToSocket };
