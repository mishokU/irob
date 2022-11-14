import {IRoutes} from "../../../routes/IROBRoutes";
import {Link, NavLink, useNavigate} from "react-router-dom";
import React from "react";
import {buttonTheme} from "../../../themes/Themes";
import {Auth} from "../../auth/domain/utils/Auth";

export function NonAuthHeader({routes}: IRoutes) {
    const navigate = useNavigate()
    return (<nav className="flex justify-between pt-4 pb-4 pl-16 pr-16 p-4 text-[#8fadc0] text-lg">
            <span>
                <Link className="font-bold mr-8 active:text-yellow-500" to={routes.home}>IROB</Link>
                <NavLink className="mr-8 active:text-yellow-500" to={routes.catalogue}>Catalogue</NavLink>
                <NavLink className="mr-8 active:text-yellow-500" to={routes.about}>About</NavLink>
            </span>
        <div className="flex">
            <h2 className="m-auto mr-8 cursor-pointer" onClick={() => {
                navigate(routes.auth, {state: {auth: Auth.LOGIN}})
            }}>Sign in</h2>
            <button className={buttonTheme + " mr-8"} onClick={() => {
                navigate(routes.auth, {state: {auth: Auth.REGISTRATION}})
            }}>Register now
            </button>
        </div>
    </nav>)
}