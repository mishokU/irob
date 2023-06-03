import whatLogo from "../assets/whats_uo.png"
import telegramLogo from "../assets/telegram.png"
import vkIcon from "../assets/vk-icon.png"
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {email} from "../../../constants/Constants";

export function Footer() {
    const navigate = useNavigate()
    return (<footer className="w-full min-h-[120px] bottom-0">
        <div className="h-0.5 opacity-5 bg-[#8fadc0]"/>
        <div className="lg:pl-32 lg:pr-32 pl-4 pr-4 pt-8 pb-16 text-[#8fadc0] grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-4">
            <div className="space-y-4">
                <h1>SOCIAL'S</h1>
                <div className="flex space-x-4">
                    <img
                        alt={"What's app link"}
                        src={whatLogo}
                        className="w-[30px] h-[30px] cursor-pointer"/>
                    <img
                        src={vkIcon}
                        className="w-[30px] h-[30px] bg-white cursor-pointer rounded-full border-2"
                        onClick={() => {
                            window.open('https://vk.com/mishkaky', 'width=400, height=400')
                        }} alt={"Vk link"}/>
                    <img
                        alt={"Telegram link"}
                        src={telegramLogo}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer border-4"/>
                </div>
            </div>
            <div className="space-y-4">
                <h1>LEGAL NOTICES</h1>
                <h2 className="text-sm opacity-70">Saint-Petersburg Office: no office</h2>
            </div>
            <div className="space-y-4">
                <h1>PRIVACY</h1>
                <h2
                    onClick={() => navigate(IROBRoutes.privacy)}
                    className="hover:underline cursor-pointer text-sm opacity-70">Privacy Policy</h2>
                <h2
                    onClick={() => navigate(IROBRoutes.terms)}
                    className="hover:underline cursor-pointer text-sm opacity-70">Terms of use</h2>
            </div>
            <div className="space-y-4">
                <h1>CONTACTS</h1>
                <h2 className="cursor-pointer text-sm opacity-70">{email}</h2>
            </div>
        </div>
    </footer>)
}