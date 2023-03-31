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
        const languages = request.body.languages
        const avatar = request.body.avatar
        await userController.updateUser(
            name,
            surname,
            description,
            website,
            location,
            languages,
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