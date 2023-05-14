const {Router} = require("express");

const contentController = require("../../controllers/ContentController")
const userController = require("../../controllers/UserController");
const roomController = require("../../controllers/RoomControllers")

const Promise = require("bluebird");
const {getUsername, getToken} = require("../../controllers/Utils");
const {deleteObject, storage, ref} = require("../../services/firebase/index");

const contentRouter = new Router()

module.exports = contentRouter

contentRouter.post('/create', (request, result) => {
    return createContent(request, result)
})

contentRouter.post('/update', (request, result) => {
    return updateContent(request, result)
})

contentRouter.delete('/delete', (request, result) => {
    return deleteContent(request, result)
})

contentRouter.get('/get', (request, result) => {
    return getContent(request, result)
})

contentRouter.get('/getPaging', (request, result) => {
    return getPagingContent(request, result, false)
})

contentRouter.get('/getUserPaging', (request, result) => {
    return getPagingContent(request, result, true)
})

async function getPagingContent(request, result, isUserContent) {
    try {

        const token = getToken(request)

        const offset = request.query.offset

        let limit
        let data

        if (isUserContent) {

            const user = await userController.getUser(token)

            limit = await contentController.getUserContentCount()
            data = await contentController.getUserPagingContent(15, offset, user.id)
        } else {
            limit = await contentController.getContentCount()
            data = await contentController.getPagingContent(15, offset)
        }

        if(token){
            const convertedContent = await Promise.map(data, async (content) => {
                return {
                    videoPreview: content.video_preview,
                    contentId: content.id,
                    name: content.name
                }
            }, {concurrency: 2})

            const newOffset = Number(offset) + 15

            result.status(200).json({
                success: true,
                content: convertedContent,
                limit: limit,
                offset: newOffset
            })
        } else {
            result.status(200).json({
                success: false,
                message: "User not logged!"
            })
        }

    } catch (e) {
        const message = "Error in get content: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getContent(request, result) {
    try {

        const contentId = request.query.contentId

        const data = await contentController.getSingleContent(contentId)

        const user = await userController.getUserById(data.user_id)

        let userData

        if(user === undefined){
            userData = {
                isDeleted: true
            }
        } else {
            userData = {
                isDeleted: false,
                username: getUsername(user),
                description: user.description,
                avatar: user.avatar,
                email: user.email,
                userId: user.id
            }
        }

        result.status(200).json({
            success: true,
            user: userData,
            content: {
                id: data.id,
                name: data.name,
                description: data.description,
                actors: data.actors,
                type: data.type,
                category: data.category,
                country: data.country,
                owner: data.owner,
                cost: data.cost,
                startDate: data.start_distr,
                endDate: data.end_distr,
                date: data.date,
                genres: data.genres,
                trailerUrl: data.trailer_url,
                year: data.year,
                videoPreview: data.video_preview
            }
        })

    } catch (e) {
        const message = "Error in get content: " + e.message
        console.log(message)
        result.json(500).json({
            success: false,
            message: message
        })
    }
}

async function updateContent(request, result) {
    try {

    } catch (e) {
        const message = "Error in content updating: " + e.message
        console.log(message)
        result.json(500).json({
            success: false,
            message: message
        })
    }
}

async function deleteContent(request, result) {
    try {

        const contentId = request.query.contentId

        const content = await contentController.getSingleContent(contentId)

        const videoUrlSubstring = content.video_url.match(/videos(?!videos|irob).*?irob/)
        const videoPreviewSubstring = content.video_preview.match(/videoPreviews(?!videoPreviews|irob).*?irob/)

        // Create a reference to the file to delete
        const videoUrl = ref(storage, videoUrlSubstring[0].replace("%2F", "/"))
        const videoPreviewUrl = ref(storage, videoPreviewSubstring[0].replace("%2F", "/"))

        // Delete all files
        deleteObject(videoUrl).then(() => {
            deleteObject(videoPreviewUrl).then(() => {
                deleteDatabaseContent(result, contentId)
                // if (content.trailer_url !== null) {
                //     console.log("here")
                //     console.log(content.trailer_url)
                //     const videoTrailerSubs = content.trailer_url.match(/videoTrailers(?!videoTrailers|mp4).*?mp4(.*)/)
                //     const videoTrailer = ref(storage, videoTrailerSubs[0])
                //     deleteObject(videoTrailer).then(() => {
                //         deleteDatabaseContent(result, contentId)
                //     })
                // } else {
                //     deleteDatabaseContent(result, contentId)
                // }
            })
        }).catch((error) => {
            console.log(error.message)
            result.status(500).json({
                success: false,
                message: "Something went wrong on deleting video content: " + error.message
            })
        });
    } catch (e) {
        const message = "Error in content deletion: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function deleteDatabaseContent(result, contentId) {
    await contentController.deleteContent(contentId)
    result.status(200).json({
        success: true,
        message: "Content deleted!"
    })
}

async function createContent(request, result) {
    try {

        const token = getToken(request)

        const {
            type,
            category,
            name,
            description,
            director,
            duration,
            actors,
            owner,
            videoUrl,
            videoPreview,
            trailerUrl,
            cost,
            startDate,
            endDate,
            genres,
            year,
            country,
            roomId
        } = request.body

        const id = await contentController.createContent(
            type,
            category,
            name,
            description,
            director,
            actors,
            owner,
            videoUrl,
            videoPreview,
            country,
            cost,
            startDate,
            endDate,
            genres,
            year,
            duration,
            trailerUrl,
            token
        )

        if (id !== undefined) {

            await roomController.updateContentId(roomId, id)

            result.status(200).json({
                success: true,
                message: "Content created!"
            })
        } else {
            result.status(400).json({
                success: false,
                message: "Content not created!"
            })
        }

    } catch (e) {
        const message = "Error in creation content: " + e.message
        console.log(message)
        result.json(500).json({
            success: false,
            message: message
        })
    }
}