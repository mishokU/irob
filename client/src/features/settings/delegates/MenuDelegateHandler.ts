import {useState} from "react";
import {SettingsMenu} from "./SettingsMenu";
import {useNavigate} from "react-router-dom";

export function MenuDelegateHandler(){

    const [activeMenu, setActiveMenu] = useState<SettingsMenu>(SettingsMenu.PROFILE)
    const navigate = useNavigate()

    function onBackClick() {
        navigate(-1)
    }

    return {
        activeMenu, setActiveMenu, onBackClick
    }

}