import {useState} from "react";
import {SettingsMenu} from "./SettingsMenu";

export function MenuDelegateHandler(){

    const [activeMenu, setActiveMenu] = useState<SettingsMenu>(SettingsMenu.PROFILE)

    return {
        activeMenu, setActiveMenu
    }

}