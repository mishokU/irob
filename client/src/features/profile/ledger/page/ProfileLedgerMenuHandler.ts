import {useState} from "react";
import {ProfileLedgerMenu} from "./ProfileLedgerMenu";

export function ProfileLedgerMenuHandler() {
    const [menu, setMenu] = useState(ProfileLedgerMenu.BALANCE)

    function setSend() {
        setMenu(ProfileLedgerMenu.SEND)
    }

    function setBalance() {
        setMenu(ProfileLedgerMenu.BALANCE)
    }

    function setReceive() {
        setMenu(ProfileLedgerMenu.RECEIVE)
    }

    return {
        menu, setSend, setReceive, setBalance
    };
}