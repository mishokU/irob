const db = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Router} = require("express");
const config = require('config')

const roomRequirementsRouter = new Router()

// export our router to be mounted by the parent application
module.exports = roomRequirementsRouter

roomRequirementsRouter.post('/apply', (request, result) => {
    return applyRequirement(request, result)
})

roomRequirementsRouter.post('/delete', (request, result) => {
    return deleteRequirement(request, result)
})

async function getRoomRequirements(request, result){
    try {
        const token = request.get('token')
        const roomId = request.query.roomId;
    } catch (e){
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in getting room requirements: " + e.message
        })
    }
}

function applyRequirement(request, result){

}

function deleteRequirement(request, result){

}