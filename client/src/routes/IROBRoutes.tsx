export enum IROBRoutes {

    auth = '/auth',
    login = '/login',
    registration= '/registration',
    nonAuthPage = '/nonAuthPage',
    profile = '/profile',
    settings = '/settings',
    catalogue = '/catalogue',
    card = '/card',
    rooms = '/rooms',
    notification = '/notification',
    sell = '/sell',
    buy = '/buy',
    about = '/about',
    home = '/home',
    sample = '/sample',
    privacy = '/privacy',
    terms = '/terms',
    faq = '/faq'

}

export interface IRoutes {
    routes: IROBRoutes
}