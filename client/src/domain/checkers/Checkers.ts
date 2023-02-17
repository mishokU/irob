

export function isLogged(): boolean {
    return localStorage.getItem("jwtToken") !== null
}