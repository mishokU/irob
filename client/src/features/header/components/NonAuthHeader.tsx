import { IROBRoutes } from "../../../routes/IROBRoutes";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { buttonTheme } from "../../../themes/Themes";
import { Auth } from "../../auth/domain/utils/Auth";
import { LogoImage } from "../assets/LogoImage";

export function NonAuthHeader() {
    const navigate = useNavigate()
    return (<nav className="flex justify-between pt-4 pb-2 pl-16 pr-16 p-4 text-[#8fadc0] text-lg">
        <span className="flex items-center">
            <LogoImage />
            <NavLink className="font-bold ml-4 mr-4 active:text-yellow-500" to={IROBRoutes.home}>IROB</NavLink>
            <NavLink className="font-bold mr-4 active:text-yellow-500" to={IROBRoutes.faq}>FAQ</NavLink>
            <NavLink className="mr-4 active:text-yellow-500" to={IROBRoutes.about}>About</NavLink>
        </span>
        <div className="flex items-center mr-8 space-x-8">
            <h2 className="m-auto cursor-pointer" onClick={() => {
                navigate(IROBRoutes.auth, { state: { auth: Auth.LOGIN } })
            }}>Sign in</h2>
            <button className={buttonTheme + " h-fit"} onClick={() => {
                navigate(IROBRoutes.auth, { state: { auth: Auth.REGISTRATION } })
            }}>Register now
            </button>
        </div>
    </nav>)
}