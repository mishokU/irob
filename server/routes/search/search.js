const {Router} = require("express");
const userController = require("../../controllers/UserController");

const searchRouter = new Router()

// export our router to be mounted by the parent application
module.exports = searchRouter

searchRouter.post('/users', (request, result) => {
    return searchUsers(request, result)
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