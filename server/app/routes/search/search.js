const {Router} = require("express");

const userController = require("../../controllers/UserController");
const sendEmailController = require("../../services/emails/sendEmail")

const searchRouter = new Router()

module.exports = searchRouter

searchRouter.post('/users', (request, result) => {
    return searchUsers(request, result)
})

searchRouter.post('/sendEmail', (request, result) => {
    return sendQuestionWithEmail(request, result)
})

async function searchUsers(request, result) {
    try {
        const {query} = request.body
        const users = await userController.searchUsers(query)
        console.log("users: " + users)
        result.status(200).json({
            success: true,
            users: users
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in search users: " + e.message
        })
    }
}

async function sendQuestionWithEmail(request, result) {
    try {

        const {fromEmail, message} = request.body

        await sendEmailController.sendQuestionEmail(fromEmail, message)

        result.status(200).json({
            success: true,
            message: "Email send!"
        })

    } catch (e) {
        const message = "Send question with email error: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}