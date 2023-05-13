const {Router} = require("express");
const https = require("https")
const firebase = require("../../services/firebase/index")

const licensesController = require("../../controllers/LicensesController")
const contentController = require("../../controllers/ContentController")

const externalRouter = new Router()

module.exports = externalRouter

externalRouter.post('/update', (request, result) => {
    return updateLicenceCounter(request, result)
})

externalRouter.get('/getVideoUrl', (request, result) => {
    return getVideoUrl(request, result)
})

async function getVideoUrl(request, result) {
    try {

        const licenseKey = request.query.licenseKey

        const license = await licensesController.getLicenseBySecretKey(licenseKey)
        const content = await contentController.getContentById(license.content_id)

        //await licensesController.updateLicenseRequirement(licenseKey, "Views count")

        const filePath = content.video_url

        if (!filePath) {
            return result.status(200).json({
                success: false,
                message: "File not found!"
            })
        }

        const videoRef = firebase.ref(firebase.storage, filePath);

        firebase.getMetadata(videoRef).then((metadata) => {

            const fileSize = metadata.size
            const range = request.headers.range;

            console.log("range:")
            console.log(range)

            if (range) {

                const parts = range.replace(/bytes=/, '').split('-')
                console.log("parts: " + parts)
                const start = parseInt(parts[0], 10);
                console.log("start: " + start)
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                console.log("end: " + end)

                const chunkSize = end - start + 1;

                console.log("chunkSize: " + chunkSize)

                console.log("Content-Range")
                const contentRange = `bytes ${start}-${end}/${fileSize}`
                console.log(contentRange)

                const headers = {
                    'Content-Range': contentRange,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4'
                };

                const options = {
                    hostname: "firebasestorage.googleapis.com",
                    path: filePath,
                    headers: headers
                }

                https.get(filePath, (stream) => {
                    result.writeHead(206, headers);
                    stream.pipe(result);
                });
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4'
                };
                result.writeHead(200, head);
                https.get(filePath, (stream) => {
                    stream.pipe(result);
                });
            }

        })

    } catch (e) {
        const message = "Error in getting video by license: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updateLicenceCounter(request, result) {
    try {

        const {licenseKey, type} = request.body

        if (licenseKey === undefined || type === undefined) {
            result.status(200).json({
                success: false,
                message: "License or type or licenseKey is undefined"
            })
        } else if (type === "Duration" || type === "Hold deposit" || type === "Cost") {
            result.status(200).json({
                success: false,
                message: `${type} value increased automatically!`
            })
        } else {

            const message = await licensesController.updateLicenseRequirement(licenseKey, type)

            if (message !== undefined) {
                result.status(400).json({
                    success: false,
                    message: message
                })
            } else {
                result.status(200).json({
                    success: true,
                    message: `Requirement with type: ${type} was increased!`
                })
            }
        }

    } catch (e) {
        const message = "Error in updating license counter: " + e.message
        console.log(message)
        result.json(500).json({
            success: false,
            message: message
        })
    }
}