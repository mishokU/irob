import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {useCreateRoomModalContext} from "../../main/contexts/CreateRoomModalProvider";
import {useNotificationContext} from "../../main/contexts/NotificationModelProvider";
import {useModalsContext} from "../../main/contexts/ModalsProvider";
import {LogoImage} from "../assets/LogoImage";

/*
    Header(лого слева,кнопки(купить, продать), поиск, сообщения, уведомления, профиль
*/

export function AuthHeader() {
    const createContent = useModalsContext()
    const createRoomModalContext = useCreateRoomModalContext()
    const notificationContext = useNotificationContext()
    return <nav className="flex justify-between pt-4 pb-4 pl-16 pr-16 p-4 text-[#8fadc0] text-lg">
        <span className="flex items-center">
                <LogoImage/>
            <NavLink className="font-bold ml-4 mr-4 active:text-yellow-500" to={IROBRoutes.home}>IROB</NavLink>
            <NavLink className="mr-4 active:text-yellow-500" to={IROBRoutes.about}>About</NavLink>
            <NavLink className="mr-4 active:text-yellow-500" to={IROBRoutes.catalogue}>Catalogue</NavLink>
        </span>
        <span className="flex items-center space-x-4">
                <button onClick={() => createContent?.setState({isVisible: true, roomId: null})}>Upload content</button>
                <button onClick={() => createRoomModalContext?.setVisibility(true)}>Create room</button>
                <button onClick={() => notificationContext?.setVisibility(true)}>Notifications</button>
                <NavLink to={IROBRoutes.profile}>Profile</NavLink>
            </span>
    </nav>
}