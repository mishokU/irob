export class AuthMiddleware {

    isUserLogged(): boolean {
        return localStorage.getItem("jwtToken") !== ""
    }

    saveToken(token: string) {
        localStorage.setItem("jwtToken", token)
    }

    removeToken() {
        localStorage.removeItem("jwtToken")
    }

}