const Cookies = require("universal-cookie");
module.exports = {
    getUsername,
    getToken
}

function getUsername(user) {
    if (user.name === "" || user.surname === "") {
        return user.email
    } else {
        return user.name + " " + user.surname
    }
}

function getToken(request) {
    const cookies = new Cookies(request.headers.cookie);
    return cookies.get('token')
}

