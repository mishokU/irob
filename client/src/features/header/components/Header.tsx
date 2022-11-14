import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {IRoutes} from "../../../routes/IROBRoutes";

/*
    Header(лого слева,кнопки(купить, продать), поиск, сообщения, уведомления, профиль
 */

export function Header({routes}: IRoutes) {
    return (<nav className="flex justify-between pt-4 pb-4 pl-16 pr-16 p-4 text-[#8fadc0] text-lg">
            <span>
                <Link className="font-bold mr-4 active:text-yellow-500 " to={routes.home}>IROB</Link>
                <NavLink className="mr-8" to={routes.catalogue}>Catalogue</NavLink>
                <NavLink className="mr-8" to={routes.sell}>Sell</NavLink>
                <NavLink className="mr-8" to={routes.buy}>Buy</NavLink>
            </span>
            <span>
                <NavLink to={routes.messages} className="mr-8">Messages</NavLink>
                <NavLink to={routes.notification} className="mr-8">Notifications</NavLink>
                <NavLink to={routes.profile}>Profile</NavLink>
            </span>
        </nav>)
}