const {Router} = require("express");

const sendEmailController = require("../../services/emails/sendEmail")

const emailsRouter = new Router()

module.exports = emailsRouter

emailsRouter.post('/resume', (request, result) => {
    return sendResume(request, result)
})

async function sendResume(request, result) {
    try {

        const {resume} = request.body

        //upload.single(resume)

        console.log(resume)

        await sendEmailController.sendResumeEmail(resume)

        result.status(200).json({
            success: true,
            message: "Resume send!"
        })

    } catch (e) {
        const message = "Send resume error: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}