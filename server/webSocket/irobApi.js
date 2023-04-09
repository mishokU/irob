const axios = require("axios");

module.exports = {
    isUserAdmin,
    hasUserWithId,
    joinUser,
    deleteUser,
    createMessage,
    updateFirstAgreement,
    updateSecondAgreement,
    createNotification
}

const api = axios.create({
    baseURL: 'http://app:5000',
});

async function isUserAdmin(id, roomId) {
    const data = {userId: id, roomId: roomId}
    return await api.get('/rooms/isRoomAdmin', {params: data}).then((result) => {
        return result.data.isAdmin
    }).catch((err) => {
        console.error(err);
    });
}

async function hasUserWithId(id, roomId) {
    const data = {userId: id, roomId: roomId}
    return await api.get('/room/users/hasUser', {params: data}).then((result) => {
        return result.data.hasUser
    }).catch((err) => {
        console.error(err);
    });
}

async function joinUser(userId, roomId) {
    const data = {userId: userId, roomId: roomId}
    await api.post('/room/users/join', data).catch((err) => {
        console.error(err);
    });
}

async function deleteUser(userId, roomId) {
    const data = {userId: userId, roomId: roomId}
    await api.delete('/room/users/leave', data).catch((err) => {
        console.error(err);
    });
}

async function createMessage(roomId, userId, content, date, avatar, messageType, username) {
    const data = {
        userId: userId,
        roomId: roomId,
        content: content,
        date: date,
        avatar: avatar,
        messageType: messageType,
        username: username
    }
    await api.post('/room/messages/create', data).catch((err) => {
        console.error(err);
    });
}

async function updateFirstAgreement(roomId, isAgreed) {
    const data = {roomId: roomId, isAgreed: isAgreed}
    await api.post('/rooms/updateFirstAgreement', data).catch((err) => {
        console.error(err);
    });
}

async function updateSecondAgreement(roomId, isAgreed) {
    const data = {roomId: roomId, isAgreed: isAgreed}
    await api.post('/rooms/updateSecondAgreement', data).catch((err) => {
        console.error(err);
    });
}

async function createNotification(roomId, type, userId){
    const data = { roomId: roomId, type: type, userId: userId }
    await api.post('/notifications/create', data).catch((error) => {
        console.error(error);
    })
}