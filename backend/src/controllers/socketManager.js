
const { Server } = require('socket.io');
let messages = {};
let connections = {};
let timeOnline = {};


const connectToSocket = (httpServer) => {
    const io = new Server(httpServer,{
        cors:{
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on('connection', (socket) => {
        socket.on("join-call", (path) => {
            if (connections[path] == undefined) {
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();
            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; a++) {
                    io.to(socket.id).emit("chat-message", messages[path][a]["message"], messages[path][a]["sender"]);
                }

            }

        })
        socket.on("signal", (toId, data) => {
            socket.to(toId).emit("signal", socket.id, data);
        })
        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).reduce(([room, isfound], [roomKey, roomValue]) => {
                if (!isfound && roomValue.includes(socket.id)) {
                    return [roomKey, true];
                }
                return [room, isfound];
            }, ["", false]);
            if (found) {
                if (messages[matchingRoom] == undefined) {
                    messages[matchingRoom] = [];
                }
                messages[matchingRoom].push({ message: data, sender: sender, "socketId": socket.id });
                connections[matchingRoom].forEach((id) => {
                    io.to(id).emit("chat-message", data, sender);
                }
                )

            }
        })
        socket.on("disconnect", (data, sender) => {
            var diffTime = Math.abs(timeOnline[socket.id] - new Date());
            var key;
            for (const [k, v] of JSON.parse(JSON.stringify(object.entries(connections)))) {
                for (let a = 0; a < v.length; a++) {
                    if (v[a] === socket.id) {
                        key = k;
                        for (let b = 0; b < connections[key].length; b++) {
                            io.to(connections[key][b]).emit("user-left", socket.id, diffTime);

                        }
                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);
                        delete timeOnline[socket.id];
                    }
                    if (connections[key].length === 0) {
                        delete connections[key];
                    }
                }
            }


        })
    });

    return io;
};

module.exports = { connectToSocket };
