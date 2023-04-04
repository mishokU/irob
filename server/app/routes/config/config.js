const {Router} = require("express");

const configRouter = new Router()

// export our router to be mounted by the parent application
module.exports = configRouter

configRouter.post('/saveGanache', (request, result) => {
    return saveGanache(request, result)
})

async function saveGanache(request, result){
    try {
        console.log(request)
    } catch (e){
        console.log(e)
    }
}