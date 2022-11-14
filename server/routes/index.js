const users = require('./user')
const auth = require('./auth')
const bodyParser = require("body-parser");

module.exports = app => {
    app.use('/users', users)
    app.use('/auth', auth)
}