const {Router} = require("express");

const roomRequirementsController = require("../../controllers/RoomRequirementsController")
const roomController = require("../../controllers/RoomControllers")
const userController = require("../../controllers/UserController");
const {getToken} = require("../../controllers/Utils");

const roomRequirementsRouter = new Router()

module.exports = roomRequirementsRouter

roomRequirementsRouter.post('/apply', (request, result) => {
    return applyRequirement(request, result)
})

roomRequirementsRouter.post('/decline', (request, result) => {
    return deleteRequirement(request, result)
})

roomRequirementsRouter.get('/getAll', (request, result) => {
    return getRoomRequirements(request, result)
})

roomRequirementsRouter.post('/create', (request, result) => {
    return createRoomRequirement(request, result)
})

roomRequirementsRouter.post('/update', (request, result) => {
    return updateRoomRequirement(request, result)
})

roomRequirementsRouter.get('/get', (request, result) => {
    return getRoomRequirement(request, result)
})

roomRequirementsRouter.get('/getRequiredRequirementCount', (request, result) => {
    return getRequiredRequirementCount(request, result)
})

roomRequirementsRouter.post('/index', (request, result) => {
    return indexRequirementsDays(request, result)
})

async function updateRoomRequirement(request, result) {
    try {

        const {id, title, description, value} = request.body

        await roomRequirementsController.updateRoomRequirement(id, title, description, value)

        result.status(200).json({
            success: true,
            message: "Requirement successfully updated!"
        })

    } catch (e) {
        const message = "Error in update room requirement: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function createRoomRequirement(request, result) {
    try {
        const token = getToken(request)
        const {roomId, title, description, type, value} = request.body
        const user = await userController.getUser(token)
        const requirementId = await roomRequirementsController.createRequirement(user.id, roomId, title, description, value, type)

        let username = ""
        if (user.name === "" || user.surname === "") {
            username = user.email
        } else {
            username = user.name + " " + user.surname
        }

        result.status(200).json({
            success: true,
            requirement: {
                username: username,
                requirementId: requirementId
            }
        })
    } catch (e) {
        const message = "Error in create room requirements: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getRoomRequirement(request, result) {
    try {
        const requirementId = request.query.requirementId;
        const requirement = await roomRequirementsController.getRequirement(requirementId)
        if (requirement !== undefined) {
            result.status(200).json({
                success: true,
                requirement: requirement
            })
        } else {
            result.status(200).json({
                success: false,
                message: "There is no such requirement"
            })
        }
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in getting room requirements: " + e.message
        })
    }
}

async function getRoomRequirements(request, result) {
    try {
        const roomId = request.query.roomId;
        const requirements = await roomRequirementsController.getRoomRequirements(roomId)
        result.status(200).json({
            requirements: requirements
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in getting room requirements: " + e.message
        })
    }
}

async function applyRequirement(request, result) {
    try {
        const {requirementId, roomId, type} = request.body
        await roomRequirementsController.applyRequirement(requirementId, type, roomId)
        result.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in apply room requirement: " + e.message
        })
    }
}

async function deleteRequirement(request, result) {
    try {
        const {requirementId} = request.body
        await roomRequirementsController.declineRequirement(requirementId)
        result.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in apply room requirement: " + e.message
        })
    }
}

/*
    There is three required requirement to make a deal
    Cost - current cost to buy this contract
    Hold deposit - cost to return if seller reject your license
    Duration days - how many days this license alive
 */

async function getRequiredRequirementCount(request, result) {
    try {

        const roomId = request.query.roomId
        const userId = request.query.userId

        const requiredCount = await roomRequirementsController.getRequiredRequirements(roomId)
        const room = await roomController.getRoom(roomId)

        const isOwner = Number(room.owner_id) === Number(userId)
        const isContentExists = room.content_id !== null

        result.status(200).json({
            success: true,
            count: requiredCount,
            fullCount: 3,
            isOwner: isOwner,
            isContentExists: isContentExists,
            firstAgreement: room.first_agreement,
            secondAgreement: room.second_agreement
        })

    } catch (e) {
        console.log(e)
        result.status(200).json({
            success: false,
            message: "Error in get room requirement count: " + e.message
        })
    }

}

async function indexRequirementsDays(request, result) {
    try {

        await roomRequirementsController.indexAllDays()

    } catch (e) {
        const message = "Error in index requirements days: " + e.message
        console.log(message)
        result.status(200).json({
            success: false,
            message: message
        })
    }
}