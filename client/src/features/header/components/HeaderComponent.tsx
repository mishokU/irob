import {useEffect, useState} from "react";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {NonAuthHeader} from "./NonAuthHeader";
import {AuthHeader} from "./AuthHeader";
import {useLocation} from "react-router-dom";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";
import {MobileNavBar} from "./MobileNavBar";

export function HeaderComponent() {

    const [visible, setVisible] = useState(true)

    const location = useLocation()
    const authMiddleware = AuthMiddleware()
    const isUserLogged = authMiddleware.getToken() !== null

    const handleScroll = () => {
        const currentScrollPos = window.scrollY
        if (currentScrollPos > 5) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (<header className={`z-60 sticky top-0 bg-[#0E1420]`}>
        <MobileNavBar/>
        <div className="hidden lg:block md:block">
            {location.pathname !== IROBRoutes.auth && !isUserLogged && <NonAuthHeader/>}
            {location.pathname !== IROBRoutes.auth && isUserLogged && <AuthHeader/>}
        </div>
        {!visible && <div className="h-0.5 w-full bg-gray-800"/>}
    </header>)
}