import React from "react";
import {RequirementsMenu} from "./RequirementsMenu";

export interface RequirementTabProps {
    menu: RequirementsMenu,
    setMenu: (menu: RequirementsMenu) => void
}

export function RequirementTabs({menu ,setMenu}: RequirementTabProps) {
    const menuStyle = "p-2 border-[#4a5058] text-white rounded-md border-2 w-full"
    const menuStyleActive = "p-2 bg-[#1E252F] text-white rounded-md border-[#29303A] border-2 w-full"
    return <div className="w-full mt-4">
        <ul className="flex justify-between text-sm font-medium text-center space-x-3" role="tablist">
            <li className="w-full" role="presentation">
                <button className={menu === RequirementsMenu.NEW ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(RequirementsMenu.NEW)
                }}>New
                </button>
            </li>
            <li className="w-full" role="presentation">
                <button className={menu === RequirementsMenu.APPLIED ? menuStyleActive : menuStyle} onClick={() => {
                    setMenu(RequirementsMenu.APPLIED)
                }}>Applied
                </button>
            </li>
        </ul>
    </div>
}