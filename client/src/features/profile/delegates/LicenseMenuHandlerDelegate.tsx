import {useState} from "react";
import {LicenseMenu} from "./LicenseMenu";

export function LicenseMenuHandlerDelegate() {
    const [menu, setMenu] = useState(LicenseMenu.MY_LICENSES)
    return {
        menu, setMenu
    }
}