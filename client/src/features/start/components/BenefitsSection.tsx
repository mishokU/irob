import pcLogo from "../assets/pc.svg";
import {buttonThemeTransparent} from "../../../ui/themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {Auth} from "../../auth/domain/utils/Auth";
import {useNavigate} from "react-router-dom";

export function BenefitsSection() {
    const navigate = useNavigate()
    return <section className="bg-[#0c131a] -mb-8">
        <div className="lg:flex lg:justify-center pt-16">
            <img className="lg:mr-24 m-auto lg:ml-0 w-[200px] lg:w-fit" src={pcLogo}/>
            <div className="flex lg:flex-none justify-center">
                <div>
                    <h1 className="mt-16 text-2xl text-[#ffb81c]">Benefits</h1>
                    <ul className="lg:mt-24 mt-4 list-disc ml-4 text-xl font-bold text-start">
                        <li>Pure profit</li>
                        <li>Zero cost</li>
                        <li>No exclusivity</li>
                        <li>Keep your rights</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="flex justify-center pb-12 mt-4 pt-8">
            <button
                className={buttonThemeTransparent}
                onClick={() => {
                    navigate(IROBRoutes.auth, {state: {auth: Auth.REGISTRATION}})
                }}>Register for free
            </button>
        </div>
    </section>
}