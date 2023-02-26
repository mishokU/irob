const users = require('./user/user')
const auth = require('./auth/auth')
const rooms = require('./room/room')
const roomUsers = require('./room/roomUsers')
const roomRequirements = require('./room/roomRequirements')
const roomMessages = require('./room/roomMessages')
const searchRouter = require('./search/search')

module.exports = app => {
    app.use('/profile', users)
    app.use('/auth', auth)
    app.use('/rooms', rooms)
    app.use('/room/users', roomUsers)
    app.use('/room/requirements', roomRequirements)
    app.use('/room/messages', roomMessages)
    app.use('/search', searchRouter)
}