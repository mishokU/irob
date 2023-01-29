import pcLogo from "../assets/pc.svg";
import {buttonTheme} from "../../../themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Auth} from "../../auth/domain/utils/Auth";
import {useNavigate} from "react-router-dom";

export function BenefitsSection() {
    const navigate = useNavigate()
    return <section className="bg-[#0c131a] -mb-8">
        <div className="lg:flex lg:justify-center pt-8">
            <img className="mr-24" src={pcLogo} />
            <div className="text-center">
                <h1 className="mt-16 text-2xl text-[#ffb81c]">Benefits</h1>
                <ul className="mt-24 list-disc ml-4 text-xl font-bold text-start">
                    <li>Pure profit</li>
                    <li>Zero cost</li>
                    <li>No exclusivity</li>
                    <li>Keep your rights</li>
                </ul>
            </div>
        </div>
        <div className="flex justify-center pb-12 pt-8">
            <button
                className={buttonTheme}
                onClick={() => {
                    navigate(IROBRoutes.auth, {state: {auth: Auth.REGISTRATION}})
                }}>Register for free
            </button>
        </div>
    </section>
}