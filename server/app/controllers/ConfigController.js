const db = require("../db");

const CONFIG_TABLE_NAME = "config"

module.exports = {
    getConfig,
    getCurrentNetwork,
    updateConfig
}

async function getCurrentNetwork(){
    try {

        const data = await db.query(`
            SELECT * FROM ${CONFIG_TABLE_NAME} WHERE enabled=true
        `)

        return data.rows[0]

    } catch (e){
        console.log("Error in getting selected network: " + e.message)
    }
}

async function getConfig() {
    try {

        const data = await db.query(`
            SELECT * FROM ${CONFIG_TABLE_NAME}
        `)

        return data.rows

    } catch (e) {
        console.log("Error in get db config:" + e.message)
    }
}

async function updateConfig(id) {
    try {

        await db.query(`UPDATE ${CONFIG_TABLE_NAME} SET enabled=false`)
        await db.query(`UPDATE ${CONFIG_TABLE_NAME} SET enabled=$1 WHERE id= $2;`, [true, id])

    } catch (e) {
        console.log("Error in updating db config: " + e.message)
    }
}

