import {Dispatch} from "react";
import {CenterMenu} from "../../messenger/main/CenterMenu";

export interface MobileBottomNavigationViewProps {
    isDealFinished: boolean
    setMenu: Dispatch<CenterMenu>
    menu: CenterMenu
}

export function MobileBottomNavigationView({isDealFinished, setMenu, menu}: MobileBottomNavigationViewProps) {
    const style = `grid h-full max-w-lg mx-auto font-medium`
    const startStyle = `${style} grid-cols-3`
    const dealFinished = `${style} grid-cols-4`
    const disableStyle = "text-sm text-gray-400"
    const activeStyle = "text-sm text-[#EAB308]"
    const disableIcon = `w-6 h-6 mb-1 text-gray-500`
    const activeIcon = `w-6 h-6 mb-1 text-[#EAB308]`
    return <div
        className="lg:hidden block fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className={!isDealFinished ? dealFinished : startStyle}>
            <button
                type="button"
                onClick={() => setMenu(CenterMenu.USERS)}
                className="inline-flex flex-col items-center justify-center px-5 bg-[#0E1420] group">
                <svg
                    className={menu === CenterMenu.USERS ? activeIcon : disableIcon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <span
                    className={menu === CenterMenu.USERS ? activeStyle : disableStyle}>Users</span>
            </button>
            <button
                type="button"
                onClick={() => setMenu(CenterMenu.CHAT)}
                className="inline-flex flex-col items-center justify-center px-5 bg-[#0E1420] group">
                <svg
                    className={menu === CenterMenu.CHAT ? activeIcon : disableIcon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
                </svg>
                <span
                    className={menu === CenterMenu.CHAT ? activeStyle : disableStyle}>Chat</span>
            </button>
            <button
                type="button"
                onClick={() => setMenu(CenterMenu.REQUIREMENTS)}
                className="inline-flex flex-col items-center justify-center px-5 bg-[#0E1420] group">
                <svg
                    className={menu === CenterMenu.REQUIREMENTS ? activeIcon : disableIcon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path
                        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                </svg>
                <span
                    className={menu === CenterMenu.REQUIREMENTS ? activeStyle : disableStyle}>Requirements</span>
            </button>
            {!isDealFinished && <button
                type="button"
                onClick={() => setMenu(CenterMenu.PAYMENT)}
                className="inline-flex flex-col items-center justify-center px-5 bg-[#0E1420] group">
                <svg
                    className={menu === CenterMenu.PAYMENT ? activeIcon : disableIcon}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                </svg>
                <span
                    className={menu === CenterMenu.PAYMENT ? activeStyle : disableStyle}>Payment</span>
            </button>}
        </div>
    </div>

}