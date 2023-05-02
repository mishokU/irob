const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Router} = require("express");

const authRouter = new Router();
const userController = require("../../controllers/UserController");

const secretKey = process.env.JWT_SECRET_KEY

module.exports = authRouter;

authRouter.post("/registration", (request, result) => {
    return registrationWithEmailPassword(request, result);
});

authRouter.post("/login", (request, result) => {
    return loginWithEmailPassword(request, result);
});

async function loginWithEmailPassword(request, result) {
    const {email, password} = request.body;
    try {
        const user = await userController.getUserByEmail(email)
        console.log(user)
        if (user === undefined) {
            result.status(400).json({
                error: `User with email ${email} is not registered, Sign Up first`,
            });
        } else {
            bcrypt.compare(password, user.password, async (err, hashResult) => {
                if (err) {
                    result.status(400).json({
                        error: `Incorrect password`,
                    });
                } else if (hashResult === true) {
                    const token = jwt.sign({email: email}, secretKey);
                    await userController.updateToken(token, email)
                    result.status(200).json({
                        message: "User signed in!",
                        user: user,
                        token: token,
                    });
                } else {
                    result.status(400).json({
                        error: "Enter correct password!",
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
        result.status(500).json({
            error: "Database error occurred while signing in!",
        });
    }
}

async function registrationWithEmailPassword(request, result) {
    const {email, password} = request.body;
    try {
        const user = await userController.getUserByEmail(email)
        if (user !== undefined) {
            return result.status(400).json({
                code: 1,
                error: `Email ${email} already there, No need to register again.`,
            });
        } else {
            bcrypt.hash(password, 10, async (error, hash) => {
                if (error) {
                    result.status(error).json({error: `Server error: ${error}`});
                }
                const token = jwt.sign({email: email}, secretKey);
                await userController.createUser(hash, email, token)
                    .then(function (data) {
                        result.status(200).json({
                            status: "success",
                            user: data,
                            token: token,
                            message: "User created successfully!",
                        });
                    })
                    .catch(function (e) {
                        console.log(e);
                        result.status(500).json({
                            error: `Database error: ${e} while registration user!`,
                        });
                    });
            });
        }
    } catch (exception) {
        console.log(exception);
        result.status(500).json({
            error: "Database error while user registration!",
        });
    }
}