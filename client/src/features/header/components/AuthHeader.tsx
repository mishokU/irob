import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {IROBRoutes, IRoutes} from "../../../routes/IROBRoutes";
import {CreateRoomModal} from "../../rooms/createRoom/CreateRoomModal";
import {useCreateRoomModalContext} from "../../main/CreateRoomModalProvider";

/*
    Header(лого слева,кнопки(купить, продать), поиск, сообщения, уведомления, профиль
 */

export function AuthHeader() {
    const createRoomModalContext = useCreateRoomModalContext()
    return <nav className="flex justify-between pt-4 pb-4 pl-16 pr-16 p-4 text-[#8fadc0] text-lg">
            <span>
                <Link className="font-bold mr-4 active:text-yellow-500 " to={IROBRoutes.home}>IROB</Link>
                <NavLink className="mr-8 active:text-yellow-500" to={IROBRoutes.about}>About</NavLink>
            </span>
        <span className="flex space-x-4">
                <button onClick={() => {
                    createRoomModalContext?.setVisibility(true)
                }}>Create room</button>
                <NavLink to={IROBRoutes.notification}>Notifications</NavLink>
                <NavLink to={IROBRoutes.profile}>Profile</NavLink>
            </span>
    </nav>
}