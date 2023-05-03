import React from "react";
import {ProfileMenu} from "../delegates/ProfileMenu";

export interface TabProps {
    menu: ProfileMenu,
    setMenu: (menu: ProfileMenu) => void
}

export function ProfileContentTabs({menu, setMenu}: TabProps) {
    const menuStyle = "p-3 hover:border-[#4a5058] hover:text-white rounded-xl border-2 border-transparent"
    const menuStyleActive = "p-3 bg-[#1E252F] text-white rounded-xl border-[#29303A] border-2"
    return <div>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center space-x-3" role="tablist">
            <li role="presentation">
                <button className={menu === ProfileMenu.Rooms ? menuStyleActive : menuStyle} onClick={() => {

                    setMenu(ProfileMenu.Rooms)
                }}>Rooms
                </button>
            </li>
            <li role="presentation">
                <button className={menu === ProfileMenu.License ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(ProfileMenu.License)
                }}>Licenses
                </button>
            </li>
            <li role="presentation">
                <button className={menu === ProfileMenu.Content ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(ProfileMenu.Content)
                }}>Content
                </button>
            </li>
            <li role="presentation">
                <button className={menu === ProfileMenu.Ledger ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(ProfileMenu.Ledger)
                }}>Ledger
                </button>
            </li>
            <li role="presentation">
                <button className={menu === ProfileMenu.Developers ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(ProfileMenu.Developers)
                }}>Developers
                </button>
            </li>
        </ul>
    </div>
}