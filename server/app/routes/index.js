const users = require('./user/user')
const auth = require('./auth/auth')
const rooms = require('./room/room')
const roomUsers = require('./room/roomUsers')
const roomRequirements = require('./room/roomRequirements')
const roomMessages = require('./room/roomMessages')
const searchRouter = require('./search/search')
const roomPayment = require('./room/roomPayment')
const licenses = require('./licenses/licenses')
const external = require('./external/externalApi')
const notifications = require('./notification/notifications')
const content = require('./content/contentApi')

/*
    In developing
*/
const config = require('./config/config')

module.exports = app => {
    app.use('/profile', users)
    app.use('/auth', auth)
    app.use('/rooms', rooms)
    app.use('/room/users', roomUsers)
    app.use('/room/requirements', roomRequirements)
    app.use('/room/messages', roomMessages)
    app.use('/room/payment', roomPayment)
    app.use('/search', searchRouter)
    app.use('/licenses', licenses)
    app.use('/notifications', notifications)
    app.use('/content', content)

    app.use('/api', external)

    app.use('/config', config)
}