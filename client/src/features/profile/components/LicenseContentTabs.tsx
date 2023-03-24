import React from "react";
import {LicenseMenu} from "../delegates/LicenseMenu";

export interface LicenseTabProps {
    menu: LicenseMenu,
    setMenu: (menu: LicenseMenu) => void
}

export function LicenseContentTabs({menu, setMenu}: LicenseTabProps) {
    const menuStyle = "p-3 hover:border-[#4a5058] hover:text-white rounded-xl border-2 border-transparent"
    const menuStyleActive = "p-3 bg-[#1E252F] text-white rounded-xl border-[#29303A] border-2"
    return <>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center space-x-3" role="tablist">
            <li className="mr-2" role="presentation">
                <button className={menu === LicenseMenu.MY_LICENSES ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(LicenseMenu.MY_LICENSES)
                }}>My Licenses
                </button>
            </li>
            <li role="presentation">
                <button className={menu === LicenseMenu.SOLD ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(LicenseMenu.SOLD)
                }}>Sold Licenses
                </button>
            </li>
            <li role="presentation">
                <button className={menu === LicenseMenu.FAVOURITE ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(LicenseMenu.FAVOURITE)
                }}>Favourite Licenses
                </button>
            </li>
            <li>
                <div className={menu === LicenseMenu.SEARCH ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(LicenseMenu.SEARCH)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth="1.5"
                         stroke="currentColor"
                         className="w-5 h-5">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </li>
        </ul>
    </>
}