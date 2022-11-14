import {IROBRoutes, IRoutes} from "../../../routes/IROBRoutes";
import {Link, useLocation} from "react-router-dom";
import {Auth} from "../domain/utils/Auth";
import {LoginComponent} from "../login/LoginComponent";
import {RegistrationComponent} from "../registration/RegistrationComponent";
import {useState} from "react";

export interface IAuth {
    routes: IROBRoutes,
    state: ((value: Auth) => void)
}

export function AuthComponent({routes}: IRoutes) {
    const location = useLocation();
    const argument = location.state.auth || Auth.LOGIN;
    const [auth, setAuth] = useState(argument)
    return <div className="overflow-hidden relative h-screen">
        <h1 className="text-9xl">{argument}</h1>
        <div className="h-[50em] w-[50em] rotate-45 bg-[#0c131a] absolute -ml-[25em] -mt-[25em]" />
        <div className="flex justify-center mt-12">
            {auth === Auth.LOGIN && <LoginComponent routes={routes} state={setAuth} />}
            {auth === Auth.REGISTRATION && <RegistrationComponent routes={routes} state={setAuth} />}
        </div>
        <div className="absolute bottom-[2em] w-screen z-20">
            <div className="flex justify-center space-x-5 underline text-[#ffb81c] text-sm">
                <Link to={routes.home}>Home</Link>
                <Link to={routes.privacy}>Privacy</Link>
                <Link to={routes.terms}>Terms</Link>
                <Link to={routes.faq}>FAQ</Link>
                <Link to={routes.about}>About us</Link>
            </div>
        </div>
        <div className="h-[50em] w-[50em] rotate-45 bottom-0 z-10 right-0 absolute bg-[#0c131a] -mr-[25em] -mb-[25em]" />
    </div>
}