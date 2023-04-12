const db = require('../../db');
const userController = require("../../controllers/UserController");
const getBalance = require("../../scripts/getBalance")
const {Router} = require("express");
const Web3 = require("web3")

const userRouter = new Router()

// export our router to be mounted by the parent application
module.exports = userRouter

userRouter.get('/all', (request, result, next) => {
    return getAllUsers(request, result, next)
})

userRouter.get('/get', (request, result) => {
    return getProfile(request, result)
})

userRouter.post('/update', (request, result) => {
    return updateUser(request, result)
})

userRouter.delete('/delete', (request, result) => {
    return deleteAccount(request, result)
})

userRouter.post('/handleDisable', (request, result) => {
    return handleDisableAccount(request, result)
})

userRouter.post('/updateLanguageAndLocation', (request, result) => {
    return updateLanguageAndLocation(request, result)
})

userRouter.post('/updatePassword', (request, result) => {
    return updatePassword(request, result)
})

userRouter.post('/updateAccountLedger', (request, result) => {
    return updateAccountLedger(request, result)
})

async function updateUser(request, result) {
    try {
        const token = request.get('token')
        const name = request.body.name
        const surname = request.body.surname
        const description = request.body.description
        const website = request.body.website
        const location = request.body.location
        const language = request.body.language
        const avatar = request.body.avatar
        await userController.updateUser(
            name,
            surname,
            description,
            website,
            location,
            language,
            avatar,
            token
        )
        result.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in get user profile: " + e.message
        })
    }
}

async function getProfile(request, result) {
    try {
        const token = request.get('token')
        const user = await userController.getUser(token)
        if (user !== undefined) {
            result.status(200).json({
                user: user
            })
        }
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in get user profile"
        })
    }
}

async function getAllUsers(request, result, next) {
    await db.query('select * from users')
        .then(function (data) {
            result.status(200)
                .json({
                    status: 'success',
                    data: data.rows,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

async function updateAccountLedger(request, result) {
    try {

        const token = request.get('token')
        const account = request.body.account

        const checkSummedAddress = Web3.utils.toChecksumAddress(account)

        await userController.updateAccountLedger(token, checkSummedAddress)

        const balance = await getBalance(account)

        result.status(200).json({
            success: true,
            balance: balance
        })
    } catch (e){
        const message = "Error in updating account balance: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updateLanguageAndLocation(request, result){
    try {

        const token = request.get('token')
        const {language, location} = request.body

        await userController.updateLanguageAndLocation(token, language.trim(), location.trim())

        result.status(200).json({
            success: true,
            language: language,
            location: location
        })

    } catch (e){
        const message = "Error in updating country and location: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function handleDisableAccount(request, result){
    try {

        const token = request.get('token')

        const isDisabled = await userController.handleDisableAccount(token)

        result.status(200).json({
            success: true,
            isDisabled: isDisabled,
            message: "Account successfully disabled!"
        })

    } catch (e){
        const message = "Error in disabling account: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function deleteAccount(request, result){
    try {

        const token = request.get('token')

        await userController.deleteAccount(token)

        result.status(200).json({
            success: true,
            message: "Account successfully deleted!"
        })

    } catch (e){
        const message = "Error in deleting account: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updatePassword(request, result){
    try {

        const token = request.get('token')

        const {password} = request.body

        await userController.updatePassword(token, password)

    } catch (e){
        const message = "Error in updating password: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}