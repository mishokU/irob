import {buttonThemeTransparent} from "../../../ui/themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Auth} from "../../auth/domain/utils/Auth";
import {useNavigate} from "react-router-dom";
import {WelcomeImage} from "./WelcomeImage";

export function WelcomeSection() {
    const navigate = useNavigate()
    return <section>
        <div className="text-center justify-center lg:m-8 m-0">
            <div className="">
                <WelcomeImage/>
            </div>
            <p className="d-none lg:mt-16 mt-2 font-bold lg:text-4xl text-2xl ml-12 mr-12 lg:ml-0 lg:ml-0">This is a
                service for sell and buy</p>
            <p className="d-none mt-4 font-bold lg:text-3xl text-xl">licences for content</p>
            <p className="lg:m-8 m-4 text-[#8fadc0]">Where buyers and sellers can interact directly anytime, anywhere.</p>
            <button
                className={buttonThemeTransparent}
                onClick={() => {
                    navigate(IROBRoutes.auth, {state: {auth: Auth.REGISTRATION}})
                }}>Register for free
            </button>
            <div className="lg:m-4 m-2">
                <a>Already using IROB?</a>
                <a className="lg:ml-4 ml-2 underline cursor-pointer" onClick={() => {
                    navigate(IROBRoutes.auth, {state: {auth: Auth.LOGIN}})
                }}>Sign in</a>
            </div>
        </div>
        <div className="h-14 w-full bg-[#0c131a] opacity-5 lg:rotate-1 rotate-0"/>
    </section>
}