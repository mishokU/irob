const db = require("../db");

const CONTENT_TABLE_NAME = "content"

const userController = require("./UserController");
const roomRequirementsController = require("../controllers/RoomRequirementsController")

module.exports = {
    createContent,
    getPagingContent,
    getContentCount,
    deleteContent,
    getSingleContent,
    updateContent,
    createStartRequirements,
    getContentById,
    getUserContentCount,
    getUserPagingContent
}

async function createStartRequirements(roomId, contentId, userId) {
    try {

        const content = await getSingleContent(contentId)

        await roomRequirementsController.createRequirement(userId, roomId, "", "", content.cost, "Cost")

    } catch (e) {
        console.log("Error in creating start requirements: " + e.message)
    }
}

async function getContentById(contentId) {
    try {

        const data = await db.query(`
            SELECT *  FROM ${CONTENT_TABLE_NAME} WHERE id=$1
        `, [contentId])

        return data.rows[0]

    } catch (e) {
        console.log("Error in get single content by room id: " + e.message)
    }
}

async function getSingleContent(contentId) {
    try {

        const data = await db.query(`
            SELECT *  FROM ${CONTENT_TABLE_NAME} WHERE id=$1
        `, [contentId])

        return data.rows[0]

    } catch (e) {
        console.log("Error in get single content: " + e.message)
    }
}

async function updateContent(contentId) {
    try {

    } catch (e) {

    }
}

async function deleteContent(contentId) {
    try {
        await db.query(`
            DELETE FROM ${CONTENT_TABLE_NAME} WHERE id=$1
        `, [contentId])
    } catch (e) {
        console.log("Error in deleting content: " + e.message)
    }
}

async function getUserContentCount(userId) {
    try {
        const data = await db.query(`SELECT COUNT(*) as count_rows FROM ${CONTENT_TABLE_NAME} WHERE user_id=$1`, [userId])
        return data.rows[0].count_rows
    } catch (e) {
        console.log("Error in user content count: " + e.message)
    }
}

async function getUserPagingContent(limit, offset, userId) {
    try {

        const data = await db.query(`
            WITH messages AS (
                SELECT * from ${CONTENT_TABLE_NAME}
                WHERE user_id=$3 ORDER BY id DESC LIMIT $1 OFFSET $2
            )
            SELECT * FROM messages ORDER BY id ASC;`, [limit, offset, userId]
        )

        return data.rows

    } catch (e) {
        console.log("Error in getting paging content: " + e.message)
    }
}

async function getContentCount() {
    try {
        const data = await db.query(`SELECT COUNT(*) as count_rows FROM ${CONTENT_TABLE_NAME}`)
        return data.rows[0].count_rows
    } catch (e) {
        console.log("Error in content count: " + e.message)
    }
}

async function getPagingContent(limit, offset) {
    try {

        const data = await db.query(`
            WITH messages AS (
                SELECT * from ${CONTENT_TABLE_NAME}
                ORDER BY id DESC LIMIT $1 OFFSET $2
            )
            SELECT * FROM messages ORDER BY id ASC;`, [limit, offset]
        )

        return data.rows

    } catch (e) {
        console.log("Error in getting paging content: " + e.message)
    }
}

async function createContent(
    contentType, category, name, description, director, actors, owner,
    videoUrl, videoPreview, country, cost, startDate, endDate, genres, year, duration, trailerUrl, token
) {

    try {

        const user = await userController.getUser(token)

        const datetime = new Date();
        const date = datetime.toISOString().slice(0, 10)

        const data = await db.query(`
                INSERT INTO ${CONTENT_TABLE_NAME} 
                (name, description, owner, type, director, country, actors, video_url, category, date, user_id, video_preview, cost, start_distr, end_distr, genres, year, trailer_url, duration) 
                VALUES ('${name}', '${description}', '${owner}', '${contentType}', '${director}', '${country}', '${actors}',
                 '${videoUrl}', '${category}', '${date}', ${user.id}, '${videoPreview}',
                  '${cost}', '${startDate}', '${endDate}', '${genres}', '${year}', '${trailerUrl}', '${duration}')
                RETURNING id
           `)

        return data.rows[0].id

    } catch (e) {
        console.log("Error in create db content: " + e.message)
    }

}