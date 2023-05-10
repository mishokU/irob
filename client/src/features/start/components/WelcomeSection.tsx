import {buttonThemeTransparent} from "../../../ui/themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Auth} from "../../auth/domain/utils/Auth";
import {useNavigate} from "react-router-dom";
import {WelcomeImage} from "./WelcomeImage";

export function WelcomeSection() {
    const navigate = useNavigate()
    return <section>
        <div className="flex-col text-center justify-center m-8 ">
            <div>
                <WelcomeImage/>
            </div>
            <p className="d-none mt-16 font-bold text-4xl">This is a service for sell and buy</p>
            <p className="d-none mt-4 font-bold text-3xl">licences for content</p>
            <p className="m-8 text-[#8fadc0]">Where buyers and sellers can interact directly anytime, anywhere.</p>
            <button
                className={buttonThemeTransparent}
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
        <div className="h-14 w-full bg-[#0c131a] opacity-5 rotate-1" />
    </section>
}