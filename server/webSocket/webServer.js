const {WebSocket, WebSocketServer} = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({server});
const port = 8000;
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

const roomController = require("../controllers/RoomControllers")
const roomUserController = require("../controllers/RoomUsersController");

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

// Event types
const typesDef = {
    USER_JOINED: 'userJoined',
    USER_LEAVED: 'userDisconnected',
    SEND_MESSAGE: 'sendMessage'
}

function broadcastMessage(json) {
    // We are sending the current data to all connected clients
    const data = JSON.stringify(json);
    for (let userId in clients) {
        let client = clients[userId];
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    }
}

async function handleMessage(message, userId) {
    const dataFromClient = JSON.parse(message.toString());
    const json = {type: dataFromClient.type};
    if (dataFromClient.type === typesDef.USER_JOINED) {

        users[userId] = dataFromClient;
        console.log(`${dataFromClient.username} joined to edit the document`)
        userActivity.push();

        const username = dataFromClient.username
        const id = dataFromClient.userId
        const roomId = dataFromClient.roomId

        const isAdmin = await roomController.isRoomAdmin(id, roomId)
        const hasUserInRoom = await roomUserController.hasUserWithId(id, roomId)
        if (!hasUserInRoom) {
            await roomUserController.joinUser(Number(id), roomId)
        }
        json.data = {username, id, isAdmin, userActivity};
    } else if (dataFromClient.type === typesDef.SEND_MESSAGE) {
        editorContent = dataFromClient.content;
        json.data = {editorContent, userActivity};
    }
    broadcastMessage(json);
}

async function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    const json = {type: typesDef.USER_LEAVED};
    const user = users[userId]
    if(user !== undefined){
        userActivity.push(`${user.username} left the document`);
        const id = user.userId
        json.data = {id, userActivity};
        delete clients[userId];
        delete users[userId];
        broadcastMessage(json);
        await roomUserController.deleteUser(id, user.roomId);
    }
}

// A new client connection request received
wsServer.on('connection', function (connection) {
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log('Recieved a new connection');

    // Store the new connection and handle messages
    clients[userId] = connection;
    console.log(`${userId} connected.`);
    connection.on('message', (message) => handleMessage(message, userId));
    // User disconnected
    connection.on('close', () => handleDisconnect(userId));
});