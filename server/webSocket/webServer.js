const {WebSocket, WebSocketServer} = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;

const {
    isUserAdmin,
    hasUserWithId,
    joinUser,
    deleteUser,
    createMessage,
    updateSecondAgreement,
    updateFirstAgreement
} = require('./irobApi')

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({server});

const port = 8080;
server.listen(port, () => {
    console.log(`WebSocket server is running on port http://localhost:${port}`);
});

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};

// Event types
const typesDef = {
    USER_JOINED: 'userJoined',
    USER_LEAVED: 'userDisconnected',
    SEND_MESSAGE: 'sendMessage',
    CREATE_REQUIREMENT: 'createRequirement',
    APPLY_REQUIREMENT: 'applyRequirement',
    DECLINE_REQUIREMENT: 'declineRequirement',
    ADD_ADMIN: 'addAdmin',
    HANDLE_AGREEMENT: 'handleAgreement'
}

function broadcastMessage(json) {
    const data = JSON.stringify(json);
    try {
        const roomId = json.data.roomId
        for (let userId in clients) {
            let client = clients[userId]
            let user = users[userId]
            if (user.roomId === roomId) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            }
        }
    } catch (e) {
        console.log("Broadcast message error: " + e.message + " type: " + data.type)
    }
}

async function handleMessage(message, userId) {
    try {
        const dataFromClient = JSON.parse(message.toString());
        const datetime = new Date();
        const json = {type: dataFromClient.type};
        const roomId = dataFromClient.roomId

        console.log(dataFromClient)

        if (dataFromClient.type === typesDef.USER_JOINED) {

            users[userId] = dataFromClient;

            const username = dataFromClient.username
            const id = dataFromClient.userId
            const avatar = dataFromClient.avatar

            console.log(id)
            console.log(avatar)
            console.log(username)

            const isAdmin = await isUserAdmin(id, roomId)
            const hasUserInRoom = await hasUserWithId(id, roomId)
            if (!hasUserInRoom) {
                await joinUser(id, roomId)
            }

            json.data = {username, id, roomId, avatar, isAdmin};

        } else if (dataFromClient.type === typesDef.SEND_MESSAGE) {

            const content = dataFromClient.content
            const username = dataFromClient.username
            const avatar = dataFromClient.avatar
            const date = datetime.toISOString().slice(0, 10) + " " + datetime.toISOString().slice(12, 19)
            const userId = dataFromClient.userId
            const messageType = dataFromClient.messageType

            await createMessage(
                roomId, userId, content, date, avatar, messageType, username
            )

            json.data = {content, username, avatar, roomId, date, userId};
        } else if (dataFromClient.type === typesDef.CREATE_REQUIREMENT) {
            const username = dataFromClient.username
            const requirementId = dataFromClient.requirementId
            const userId = dataFromClient.userId
            json.data = {username, userId, roomId, requirementId}
        } else if (dataFromClient.type === typesDef.APPLY_REQUIREMENT) {
            const requirementId = dataFromClient.requirementId
            json.data = {requirementId, roomId}
        } else if (dataFromClient.type === typesDef.DECLINE_REQUIREMENT) {
            const requirementId = dataFromClient.requirementId
            json.data = {requirementId, roomId}
        } else if (dataFromClient.type === typesDef.ADD_ADMIN) {

        } else if (dataFromClient.type === typesDef.HANDLE_AGREEMENT) {
            const isOwner = dataFromClient.isOwner
            const isAgreed = !dataFromClient.isAgreed

            if (isOwner) {
                await updateFirstAgreement(roomId, isAgreed)
            } else {
                await updateSecondAgreement(roomId, isAgreed)
            }

            json.data = {isOwner, isAgreed, roomId}
        }
        broadcastMessage(json);
    } catch (e) {
        console.log("handle message error: " + e.message)
    }
}

async function handleDisconnect(userId) {
    try {
        console.log(`${userId} disconnected.`);
        const json = {type: typesDef.USER_LEAVED};
        const user = users[userId]
        if (user !== undefined) {
            const id = user.userId
            const roomId = user.roomId
            json.data = {roomId, id};
            await deleteUser(id, user.roomId);
            delete clients[userId];
            delete users[userId];
            broadcastMessage(json);
        } else {
            console.log("no user to disconnect")
        }
    } catch (e) {
        console.log("error in discronect: " + e.message)
    }
}

// A new client connection request received
wsServer.on('connection', function (connection, request) {
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log('Recieved a new connection');
    console.log("connection: " + request.headers.host)
    // Store the new connection and handle messages
    clients[userId] = connection;
    console.log(`${userId} connected.`);
    connection.on('message', (message) => handleMessage(message, userId));
    // User disconnected
    connection.on('close', () => {
        handleDisconnect(userId)
    });
});