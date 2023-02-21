const users = require('./user')
const auth = require('./auth')
const rooms = require('./room/room')
const roomUsers = require('./room/roomUsers')
const roomRequirements = require('./room/roomRequirements')
const roomMessages = require('./room/roomMessages')

module.exports = app => {
    app.use('/profile', users)
    app.use('/auth', auth)
    app.use('/rooms', rooms)
    app.use('/room/users', roomUsers)
    app.use('/room/requirements', roomRequirements)
    app.use('/room/messages', roomMessages)
}