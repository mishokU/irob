import {buttonTheme} from "../../../themes/Themes";
import {Auth} from "../domain/utils/Auth";
import {IAuth} from "../components/AuthComponent";

export function LoginComponent(auth: IAuth) {

    return (<div className="absolute">
        <h1 className="text-4xl text-center text-white pb-4">IROB</h1>
        <h2 className="text-[#8fadc0] text-xs font-bold">Email</h2>
        <input className="bg-[#8fadc01a] mt-2 w-[250px] rounded border p-2 text-white border-[#8fadc033]"
               type="email"
               placeholder="Your email here" />
        <h2 className="text-[#8fadc0] mt-6 text-xs font-bold">Password</h2>
        <input className="bg-[#8fadc01a] mt-2 w-[250px] rounded  border p-2 text-white border-[#8fadc033]"
               type="password"
               placeholder="Your password" />
        <div className="flex justify-center pt-8">
            <button
                className={buttonTheme}
                onClick={() => {
                }}>Log In
            </button>
        </div>
        <h2 className="text-[#ffb81c] text-sm mt-4 text-center cursor-pointer">Forgot your password?</h2>
        <h2 className="text-[#ffb81c] text-sm mt-2 text-center cursor-pointer " onClick={() => {auth.state(Auth.REGISTRATION)}}>Register here!</h2>
    </div>)
}