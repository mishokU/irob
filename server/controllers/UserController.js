const db = require("../db");
const bcrypt = require("bcrypt");

const crypto = require('crypto');

const generatePassword = (
    length = 8,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) =>
    Array.from(crypto.randomFillSync(new Uint32Array(length)))
        .map((x) => wishlist[x % wishlist.length])
        .join('')

module.exports = {
    getUser: async function (token) {
        try {
            const data = await db.query(`SELECT * FROM users WHERE token= $1;`, [token])
            return data.rows[0]
        } catch (e) {
            console.log("get user error: " + e.message)
            console.log("token: " + token)
        }
    },
    getUserById: async function (userId) {
        const data = await db.query(`SELECT * FROM users WHERE id= $1;`, [userId])
        return data.rows[0]
    },
    searchUsers: async function (query) {
        const users = await db.query(`SELECT * from users WHERE name= $1 OR surname= $1 OR email= $1`, [query])
        return users.rows
    },
    updatePassword: function (token, newPassword) {
        bcrypt.hash(newPassword, 10, async (error, hash) => {
            await db.query(`UPDATE users SET password = $2 WHERE token= $1;`, [token, hash])
        })
    },
    updateToken: async function (token, email) {
        await db.query(`UPDATE users SET token= $1 WHERE email= $2;`, [token, email])
    },
    updateUser: async function (name, surname, description, website, location, languages, avatar, token) {
        await db.query(`UPDATE users SET 
            name = $2,
            surname = $3,
            description = $4,
            website = $5,
            location = $6,
            languages = $7,
            avatar = $8
        WHERE token = $1;`, [token, name, surname, description, website, location, languages, avatar]);
        return "Данные обновлены"
    },
    isUserExists: async function (email) {
        const user = await db.query(`SELECT * FROM users WHERE email= $1`, [email])
        return user.rows.length !== 0
    },
    createUser: async function (hash, email, token) {
        const userId = await db.query(
            `
                INSERT INTO users
                (name, surname, avatar, description, website, nickname, password, email, token, location, languages, followers)
                VALUES ('','', '', '', '', '', '${hash}', '${email}', '${token}', '', '', '${0}')
                RETURNING id
             `
        )
        return await this.getUserById(userId.rows[0].id)
    },
    updateAccountLedger: async function(token, account) {
        try {
            await db.query(`UPDATE users SET account =$2 WHERE token =$1;`, [token, account]);
        } catch (e){
            console.log("Error in update account ledger: " + e.message)
        }
    },
    getAccount: async function(userId) {
        try {
            const data = await db.query(`SELECT account FROM users WHERE id= $1`, [userId])
            return data.rows[0].account
        } catch (e){
            console.log("Error in get account: " + e.message)
        }
    }
}