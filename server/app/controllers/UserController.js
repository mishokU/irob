const db = require("../db");
const bcrypt = require("bcryptjs");

module.exports = {
    getUser,
    getUserById,
    searchUsers,
    getUserByEmail,
    updateToken,
    updateUser,
    updatePassword,
    updateAccountLedger,
    getAccount,
    createUser,
    deleteAccount,
    handleDisableAccount,
    updateLanguageAndLocation,
    isUserExists
}

async function getUser(token) {
    try {

        const data = await db.query(`SELECT * FROM users WHERE token=$1;`, [token])

        return data.rows[0]
    } catch (e) {
        console.log("Get user error: " + e.message)
    }
}


async function getUserById(userId) {
    const data = await db.query(`SELECT * FROM users WHERE id=$1;`, [userId])
    return data.rows[0]
}

async function searchUsers(query) {
    const users = await db.query(`SELECT * from users WHERE name like '%${query}%' OR surname like '%${query}%' OR email like '%${query}%'`)
    return users.rows
}

async function getUserByEmail(email) {
    try {
        const data = await db.query(`SELECT * FROM users WHERE email=$1;`, [
            email,
        ]);
        return data.rows[0];
    } catch (e) {
        console.log("Error in get user by email: " + e.message)
    }
}

async function updatePassword(token, currentPassword, oldPassword, newPassword, result) {
    bcrypt.compare(oldPassword, currentPassword, async (error, hashResult) => {
        if (error) {
            result.status(200).json({
                success: false,
                message: "Incorrect password"
            })
        } else if (hashResult === true) {
            bcrypt.hash(newPassword, 10, async (error, hash) => {
                await db.query(`UPDATE users SET password=$2 WHERE token=$1;`, [token, hash])
            })
            result.status(200).json({
                success: true,
                message: "Password updated!"
            })
        } else {
            result.status(200).json({
                success: false,
                message: "Current password incorrect!"
            })
        }
    })
}

async function updateToken(token, email) {
    await db.query(`UPDATE users SET token=$1 WHERE email=$2;`, [token, email])
}

async function updateUser(name, surname, description, website, location, language, avatar, token) {
    await db.query(`UPDATE users SET 
            name=$2,
            surname=$3,
            description=$4,
            website=$5,
            location=$6,
            language=$7,
            avatar=$8
        WHERE token=$1;`, [token, name, surname, description, website, location, language, avatar]);
    return "Данные обновлены"
}

async function isUserExists(email) {
    const user = await db.query(`SELECT * FROM users WHERE email= $1`, [email])
    return user.rows.length !== 0
}

async function createUser(hash, email, token) {
    const userId = await db.query(
        `
                INSERT INTO users
                (name, surname, avatar, description, website, nickname, password, email, token, location, language, followers)
                VALUES ('','', '', '', '', '', '${hash}', '${email}', '${token}', '', '', '${0}')
                RETURNING id
             `
    )
    return await this.getUserById(userId.rows[0].id)
}

async function updateAccountLedger(token, account) {
    try {
        await db.query(`UPDATE users SET account =$2 WHERE token =$1;`, [token, account]);
    } catch (e) {
        console.log("Error in update account ledger: " + e.message)
    }
}

async function getAccount(userId) {
    try {
        const data = await db.query(`SELECT account FROM users WHERE id= $1`, [userId])
        return data.rows[0].account
    } catch (e) {
        console.log("Error in get account: " + e.message)
    }
}

async function deleteAccount(token) {
    try {
        await db.query(`DELETE FROM users WHERE token= $1`, [token])
    } catch (e) {
        console.log("Error in deleting account: " + e.message)
    }
}

async function handleDisableAccount(token) {
    try {
        const user = await this.getUser(token)
        const isDisabled = !user.disabled
        await db.query(`UPDATE users SET disabled=$2 WHERE token= $1;`, [token, isDisabled])
        return isDisabled
    } catch (e) {
        console.log("Error in disabled account: " + e.message)
    }
}

async function updateLanguageAndLocation(token, language, location) {
    try {
        await db.query(`UPDATE users SET language=$2, location=$3 WHERE token= $1;`, [token, language, location])
    } catch (e) {
        console.log("Error in updating country and location: " + e.message)
    }
}