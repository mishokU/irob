import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Link, Location, useLocation} from "react-router-dom";
import {Auth} from "../domain/utils/Auth";
import {LoginComponent} from "../login/LoginComponent";
import {RegistrationComponent} from "../registration/RegistrationComponent";
import React, {useState} from "react";
import {BackButton} from "../../../ui/common/BackButton";
import {ErrorToastComponent, useErrorToast} from "../../../ui/common/ToastErrorComponent";
import {BigLogoImage} from "../../header/assets/BigLogoImage";

export interface IAuth {
    state: ((value: Auth) => void),
    errorState: ((value: string) => void)
}

export function AuthPage() {
    const location = useLocation();
    const argument: Auth = getAuthPath(location)
    const [auth, setAuth] = useState(argument)
    const {message, setErrorMessage} = useErrorToast()
    return <div className="overflow-hidden lg:h-screen h-full">
        <div className="lg:block hidden">
            <BackButton/>
        </div>
        {message != null && <ErrorToastComponent message={message}/>}
        <div className="lg:block hidden h-[50em] w-[50em] rotate-45 bg-[#0c131a] absolute -ml-[25em] -mt-[25em]"/>
        <div className="flex items-center justify-center mt-8 ">
            <BigLogoImage/>
        </div>
        <div className="flex justify-center h-fit">
            {auth === Auth.LOGIN && <LoginComponent state={setAuth} errorState={setErrorMessage}/>}
            {auth === Auth.REGISTRATION && <RegistrationComponent state={setAuth} errorState={setErrorMessage}/>}
        </div>
        <div className="lg:absolute fixed bottom-[2em] w-screen z-20">
            <div className="flex justify-center space-x-5 underline text-[#ffb81c] text-sm">
                <Link to={IROBRoutes.home}>Home</Link>
                <Link to={IROBRoutes.privacy}>Privacy</Link>
                <Link to={IROBRoutes.terms}>Terms</Link>
                <Link to={IROBRoutes.faq}>FAQ</Link>
                <Link to={IROBRoutes.about}>About us</Link>
            </div>
        </div>
        <div className="lg:block hidden h-[50em] w-[50em] rotate-45 bottom-0 z-10 right-0 absolute bg-[#0c131a] -mr-[25em] -mb-[25em]"/>
    </div>
}

function getAuthPath(location: Location) {
    if (location.state === null) {
        return Auth.LOGIN
    } else if (location.state.auth === null) {
        return Auth.LOGIN
    } else {
        return location.state.auth
    }
}