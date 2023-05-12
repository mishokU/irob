const nodemailer = require("nodemailer");

module.exports = {
    sendQuestionEmail,
    sendResumeEmail
}

const transporter = nodemailer.createTransport({
    service: 'mail',
    secure: false,
    host: "smtp.mail.ru",
    port: 25,
    logger: true,
    debug: true,
    auth: {
        user: 'irob.business@mail.ru',
        pass: 'PUG0fGiRznfhryngNDYf'
    }
});

async function sendQuestionEmail(email, message) {
    try {
        sendEmail(email, message)
    } catch (e) {
        console.log("Error in send email")
    }
}

async function sendResumeEmail(resume) {
    try {
        sendResume(resume)
    } catch (e) {
        console.log("Error in send email")
    }
}

function sendResume(resume) {
    const mailOptions = {
        from: 'irob.business@mail.ru',
        to: 'irob.business@mail.ru',
        subject: 'RESUME!',
        html: `<p>${resume}</p>`
    };
    sendMail(mailOptions)
}

function sendEmail(email, message) {
    const mailOptions = {
        from: 'irob.business@mail.ru',
        to: 'irob.business@mail.ru',
        subject: 'New Question!',
        text: `From ${email} !`,
        html: getHtmlDocument(message, email)
    };
    sendMail(mailOptions)
}

function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function getHtmlDocument(message, email) {
    return `<p>${message} from ${email}</p>`
}