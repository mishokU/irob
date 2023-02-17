// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db');
const {Router} = require("express");

const userRouter = new Router()
const userController = require("../controllers/UserController");

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

async function updateUser(request, result) {
    try {
        const token = request.get('token')
        const name = request.body.name
        const surname = request.body.surname
        const description = request.body.description
        const website = request.body.website
        const location = request.body.location
        const languages = request.body.languages
        await userController.updateUser(
            name,
            surname,
            description,
            website,
            location,
            languages,
            token
        )
        result.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in get user profile"
        })
    }
}

async function getProfile(request, result) {
    try {
        const token = request.get('token')
        const user = await userController.getUser(token)
        console.log("user: " + user)
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