module.exports = {
    getUsername
}

function getUsername(user) {
    if (user.name === "" || user.surname === "") {
        return user.email
    } else {
        return user.name + " " + user.surname
    }
}

