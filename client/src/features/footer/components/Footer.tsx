import whatsupLogo from "../assets/whats_uo.png"
import telegramLogo from "../assets/telegram.png"
import vkIcon from "../assets/vk-icon.png"

export function Footer() {
    return (<footer className="w-full min-h-[120px] bottom-0">
        <div className="h-[1px] bg-black" />
        <div className="pl-32 pr-32 pt-16 pb-16 text-white grid grid-cols-4">
            <div className="space-y-4">
                <h1>SOCIAL'S</h1>
                <div className="flex space-x-4">
                    <img src={whatsupLogo} className="w-[40px] h-[40px] cursor-pointer" />
                    <img src={vkIcon}
                         className="w-[40px] h-[40px] bg-white cursor-pointer rounded-full border-2"
                         onClick={() => {
                             window.open('https://vk.com/mishkaky', 'width=400, height=400')
                         }} />
                    <img src={telegramLogo} className="w-[40px] h-[40px] rounded-full cursor-pointer border-4" />
                </div>
            </div>
            <div className="space-y-4">
                <h1>LEGAL NOTICES</h1>
                <h1>Saint-Petersburg Office: no office</h1>
            </div>
            <div className="space-y-4">
                <h1>PRIVACY POLICY</h1>
                <h1>Privacy Policy</h1>
            </div>
            <div className="space-y-4">
                <h1>Contacts</h1>
                <h1>usov.misha@gmail.com</h1>
            </div>
        </div>
    </footer>)
}