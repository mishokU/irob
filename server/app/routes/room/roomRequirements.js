const {Router} = require("express");

const roomRequirementsController = require("../../controllers/RoomRequirementsController")

const roomRequirementsRouter = new Router()

// export our router to be mounted by the parent application
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

roomRequirementsRouter.get('/get', (request, result) => {
    return getRoomRequirement(request, result)
})

roomRequirementsRouter.get('/getRequiredRequirementCount', (request, result) => {
    return getRequiredRequirementCount(request, result)
})

async function createRoomRequirement(request, result) {
    try {
        const token = request.get('token')
        const {roomId, title, description, type, value} = request.body
        const data = await roomRequirementsController.createRequirement(token, roomId, title, description, value, type)
        result.status(200).json({
            success: true,
            requirement: data
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in create room requirements: " + e.message
        })
    }
}

async function getRoomRequirement(request, result) {
    try {
        const requirementId = request.query.requirementId;
        const requirement = await roomRequirementsController.getRequirement(requirementId)
        result.status(200).json({
            requirement: requirement
        })
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
        const {requirementId} = request.body
        await roomRequirementsController.applyRequirement(requirementId)
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

async function getRequiredRequirementCount(request, result){
    try {
        const roomId = request.query.roomId
        const requiredCount = await roomRequirementsController.getRequiredRequirements(roomId)
        console.log(requiredCount)
        result.status(200).json({
            success: true,
            count: requiredCount,
            fullCount: 3
        })
    } catch (e){
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in get room requirement count: " + e.message
        })
    }
}