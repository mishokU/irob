import {useState} from "react";
import {ProfileLedgerMenu} from "./ProfileLedgerMenu";

export function ProfileLedgerMenuHandler() {
    const [menu, setMenu] = useState(ProfileLedgerMenu.SEND)

    function setSend() {
        setMenu(ProfileLedgerMenu.SEND)
    }

    function setReceive() {
        setMenu(ProfileLedgerMenu.RECEIVE)
    }

    return {
        menu, setSend, setReceive
    };
}