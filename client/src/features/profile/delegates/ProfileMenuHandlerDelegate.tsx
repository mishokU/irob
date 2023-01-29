import {useState} from "react";
import {ProfileMenu} from "./ProfileMenu";

export function ProfileMenuHandlerDelegate() {
    const [menu, setMenu] = useState(ProfileMenu.License)
    return {
        menu, setMenu
    }
}