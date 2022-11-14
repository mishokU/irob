// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Router} = require("express");

const userRouter = new Router()

const USERS_TABLE_NAME = 'users'

// export our router to be mounted by the parent application
module.exports = userRouter

userRouter.get('/all', (request, result, next) => {
    return getAllUsers(request, result, next)
})

async function getAllUsers(request, result, next) {
    await db.query('select * from users')
        .then(function (data) {
            result.status(200)
                .json({
                    status: 'success',
                    data: data.rows,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}