import {buttonThemeTransparent} from "../../../ui/themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Auth} from "../../auth/domain/utils/Auth";
import {useNavigate} from "react-router-dom";


export function CreateAccountSection() {
    const navigate = useNavigate()
    return <section>
        <div className="lg:block hidden h-20 w-full -rotate-2 opacity-5 bg-[#0c131a] -mt-8"/>
        <div className="w-fit m-auto p-16">
            <h2 className="text-yellow-400 lg:pt-16 pt-0 font-bold text-center text-md">REGISTER FOR FREE</h2>
            <h1 className="mt-8 lg:text-5xl text-2xl leading-tight font-bold text-center">Create an account to get <br className="lg:block hidden"/> the whole experience</h1>
            <div className="flex justify-center m-12">
                <button
                    className={buttonThemeTransparent}
                    onClick={() => {
                        navigate(IROBRoutes.auth, {state: {auth: Auth.REGISTRATION}})
                    }}>Register for free
                </button>
            </div>
        </div>
    </section>
}