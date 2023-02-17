export enum IROBRoutes {

    auth = '/auth',
    login = '/login',
    registration= '/registration',

    nonAuthPage = '/nonAuthPage',
    profile = '/profile',
    settings = '/settings',
    catalogue = '/catalogue',
    rooms = '/rooms',
    messages = '/messages',
    notification = '/notification',
    sell = '/sell',
    buy = '/buy',
    about = '/about',
    home = '/home',
    privacy = '/privacy',
    terms = '/terms',
    faq = '/faq'

}

export interface IRoutes {
    routes: IROBRoutes
}