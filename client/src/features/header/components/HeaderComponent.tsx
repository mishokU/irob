import {useEffect, useState} from "react";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {NonAuthHeader} from "./NonAuthHeader";
import {AuthHeader} from "./AuthHeader";
import {useLocation} from "react-router-dom";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";

export function HeaderComponent() {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true)

    const location = useLocation()
    const authMiddleware = AuthMiddleware()
    const isUserLogged = authMiddleware.getToken() !== null

    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if (currentScrollPos > prevScrollPos) {
            setVisible(false)
        } else {
            setVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (<div className={`z-20 sticky absolute ${visible ? 'top-0 bg-[#0E1420] ' : ''} `}>
        {location.pathname !== IROBRoutes.auth && !isUserLogged && <NonAuthHeader />}
        {location.pathname !== IROBRoutes.auth && isUserLogged && <AuthHeader />}
    </div>)
}