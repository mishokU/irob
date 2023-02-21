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
const roomMessagesController = require("../controllers/RoomMessagesController")

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};

// User activity history.
let userActivity = [];

// Event types
const typesDef = {
    USER_JOINED: 'userJoined',
    USER_LEAVED: 'userDisconnected',
    SEND_MESSAGE: 'sendMessage',
    CREATE_REQUIREMENT: 'createRequirement',
    APPLY_REQUIREMENT: 'applyRequirement',
    DECLINE_REQUIREMENT: 'declineRequirement'
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
    const datetime = new Date();
    const json = {type: dataFromClient.type};
    console.log("type: " + dataFromClient.type)
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

        json.data = {username, id, isAdmin};

    } else if (dataFromClient.type === typesDef.SEND_MESSAGE) {

        const content = dataFromClient.content
        const username = dataFromClient.username
        const avatar = dataFromClient.avatar
        const date = datetime.toISOString().slice(0, 10) + " " + datetime.toISOString().slice(12, 19)
        const userId = dataFromClient.userId
        const roomId = dataFromClient.roomId
        const messageType = dataFromClient.messageType

        await roomMessagesController.addRoomMessage(
            roomId, userId, content, date, avatar, messageType, username
        )

        json.data = {content, username, avatar, date, userId};
    } else if (dataFromClient.type === typesDef.CREATE_REQUIREMENT) {
        const username = dataFromClient.username
        const requirementId = dataFromClient.requirementId
        json.data = {username, requirementId}
    } else if (dataFromClient.type === typesDef.APPLY_REQUIREMENT) {
        const requirementId = dataFromClient.requirementId
        json.data = {requirementId}
    } else if (dataFromClient.type === typesDef.DECLINE_REQUIREMENT) {
        const requirementId = dataFromClient.requirementId
        json.data = {requirementId}
    }
    broadcastMessage(json);
}

async function handleDisconnect(userId) {
    console.log(`${userId} disconnected.`);
    const json = {type: typesDef.USER_LEAVED};
    const user = users[userId]
    if (user !== undefined) {
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