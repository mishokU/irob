export class IROBRoutes {

    auth: string = "/auth"
    login: string = "/login"
    registration: string = "/registration"

    profile: string = "/profile"
    catalogue: string = "/catalogue"
    messages: string = "/messages"
    notification: string = "/notification"
    sell: string = "/sell"
    buy: string = "/buy"
    about: string = "/about"
    home: string = "/home"
    privacy: string = "/privacy"
    terms: string = "/terms"
    faq: string = "/faq"

}

export interface IRoutes {
    routes: IROBRoutes
}

export interface IPath {
    path: string
}