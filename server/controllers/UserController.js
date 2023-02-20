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
        const data = await db.query(`SELECT * FROM users WHERE token= $1;`, [token])
        return data.rows[0]
    },
    getUserById: async function (userId){
        const data = await db.query(`SELECT * FROM users WHERE id= $1;`, [userId])
        return data.rows[0]
    },
    updatePassword: function (token, newPassword) {
        bcrypt.hash(newPassword, 10, (error, hash) => {
            db.query(`UPDATE users SET password = $2 WHERE token= $1;`, [token, hash])
        })
    },
    updateToken: async function (token, email) {
        await db.query(`UPDATE users SET token= $1 WHERE email= $2;`, [token, email])
    },
    updateUser: async function (name, surname, description, website, location, languages, token) {
        await db.query(`UPDATE users SET 
            name = $2,
            surname = $3,
            description = $4,
            website = $5,
            location = $6,
            languages = $7
        WHERE token = $1;`, [token, name, surname, description, website, location, languages]);
        return "Данные обновлены"
    },
    isUserExists: async function (email) {
        const user = await db.query(`SELECT * FROM users WHERE email= $1`, [email])
        return user.rows.length !== 0
    },
    createUser: async function (fullName, email) {
        const password = generatePassword()
        const age = "0"
        const weight = "0"
        const height = "0"
        const username = fullName.split(" ").at(0)
        const surname = fullName.split(" ").at(1)
        const token = "0"
        bcrypt.hash(password, 10, (error, hash) => {
            db.query(`
                        INSERT INTO users (email, password, username, age, weight, height, surname, token)
                        VALUES ('${email}', '${hash}', '${username}','${age}', '${weight}', '${height}','${surname}', '${token}')
                    `)
        })
        return password
    }
}