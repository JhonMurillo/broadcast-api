const io = require('socket.io');

let socketServer = null;
let socketIO = null;

const start = (server) => {
    socketIO = io(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    socketIO.on('connection', (socket) => {
        socketServer = socket;
    });
}


const get = () => {
    return { socketServer, socketIO }
}


module.exports = {
    start,
    get
}