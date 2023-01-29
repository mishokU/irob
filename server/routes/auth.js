const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Router} = require("express");
const config = require('config')

const authRouter = new Router()

const USERS_TABLE_NAME = 'users'
const secretKey = config.get('secretKey')

// export our router to be mounted by the parent application
module.exports = authRouter

authRouter.post('/registration', (request, result) => {
    return registrationWithEmailPassword(request, result)
})

authRouter.post('/login', (request, result) => {
    return loginWithEmailPassword(request, result)
})

//Login Function
async function loginWithEmailPassword(request, result) {
    const {email, password} = request.body;
    try {
        const data = await db.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            result.status(400).json({
                error: `User with email ${email} is not registered, Sign Up first`,
            });
        } else {
            let currentUser = user[0]
            bcrypt.compare(password, currentUser.password, (err, hashResult) => { //Comparing the hashed password
                if (err) {
                    result.status(400).json({
                        error: `Incorrect password`,
                    });
                } else if (hashResult === true) {
                    const token = jwt.sign({email: email}, secretKey);
                    result.status(200).json({
                        message: "User signed in!",
                        token: token,
                    });
                } else {
                    result.status(400).json({
                        error: "Enter correct password!"
                    });
                }
            })
        }
    } catch (err) {
        console.log(err);
        result.status(500).json({
            error: "Database error occurred while signing in!"
        });
    }
}

async function registrationWithEmailPassword(request, result) {
    const {name, email, surname, password, photoUrl, description, websiteUrl, nickname} = request.body
    try {
        const data = await db.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if user already exists
        const users = data.rows;
        if (users.length !== 0) {
            return result.status(400).json({
                    code: 1,
                    error: `Email ${email} already there, No need to register again.`
                }
            )
        } else {
            bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        result.status(error).json({error: `Server error: ${error}`,});
                    }
                    db.query(`
                        INSERT INTO ${USERS_TABLE_NAME}
                        (name, surname, photo_url, description, website_url, nickname, password, email)
                        VALUES ('${name}', '${surname}', '${photoUrl}', '${description}', '${websiteUrl}', '${nickname}', '${hash}', '${email}')
                    `).then(function (data) {
                        const token = jwt.sign({email: email}, secretKey);
                        result.status(200)
                            .json({
                                status: 'success',
                                data: data.data,
                                token: token,
                                message: 'User created successfully'
                            })
                    }).catch(function (e) {
                        console.log(e)
                        result.status(500).json({
                            error: `Database error: ${e} while registration user!`
                        });
                    });
                }
            )
        }
    } catch (exception) {
        console.log(exception);
        result.status(500).json({
            error: "Database error while registring user!"
        });
    }
}