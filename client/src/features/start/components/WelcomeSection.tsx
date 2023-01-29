import logo from "../assets/start-image-logo.png";
import {buttonTheme} from "../../../themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Auth} from "../../auth/domain/utils/Auth";
import {useNavigate} from "react-router-dom";

export function WelcomeSection() {
    const navigate = useNavigate()
    return <section>
        <div className="flex-col text-center justify-center m-8 ">
            <div>
                <img className="m-auto" src={logo} alt="Logo" />
            </div>
            <p className="d-none mt-16 font-bold text-3xl">
                This is a service for sell and buy
            </p>
            <p className="d-none font-bold text-3xl">licences for content</p>
            <p className="m-8 text-[#8fadc0]">
                Where buyers and sellers can interact directly anytime, anywhere.
            </p>
            <button
                className={buttonTheme}
                onClick={() => {
                    navigate(IROBRoutes.auth, {state: {auth: Auth.REGISTRATION}})
                }}>Register for free
            </button>
            <div className="m-4">
                <a>Already using IROB?</a>
                <a className="ml-4 underline cursor-pointer" onClick={() => {
                    navigate(IROBRoutes.auth, {state: {auth: Auth.LOGIN}})
                }}>Sign in</a>
            </div>
        </div>
        {/*<div className="w-[400px] h-[400px] bg-[#1d2b37] rotate-45 absolute -mt-80 -ml-56 rounded-lg overflow-hidden" />*/}
        {/*<div className="w-[400px] h-[400px] bg-[#1d2b37] rotate-45 right-0 top-0 absolute mt-40 -mr-56 rounded-lg overflow-hidden" />*/}
        <div className="h-14 w-full bg-[#0c131a] rotate-1" />
    </section>
}