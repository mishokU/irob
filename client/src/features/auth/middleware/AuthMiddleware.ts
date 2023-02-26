function AuthMiddleware() {

    function getToken(): string | null {
        return localStorage.getItem("jwtToken")
    }

    function saveToken(token: string) {
        console.log("new token: " + token)
        localStorage.setItem("jwtToken", token)
    }

    function removeToken() {
        localStorage.removeItem("jwtToken")
    }

    return {
        saveToken, removeToken, getToken
    }
}

export default AuthMiddleware;