import {IAuth} from "../components/AuthComponent";
import {buttonTheme} from "../../../themes/Themes";
import {Auth} from "../domain/utils/Auth";
import useViewModel from "./RegistrationViewModel";

export function RegistrationComponent(auth: IAuth) {
    const {register, setEmail, setPassword} = useViewModel()
    return <div className="absolute space-y-4 w-[18.75em]">
        <h1 className="text-4xl text-center text-white">IROB</h1>
        <h1 className="text-2xl font-bold text-center text-white">Get started!</h1>
        <p className="text-center text-1xl pb-4 text-[#8fadc0]">Join the community, and get the whole experience</p>
        <form className="flex-column items-center">
            <h2 className="text-[#8fadc0] text-xs font-bold">Work Email</h2>
            <input className="bg-[#8fadc01a] w-full rounded border mt-2 p-2 text-white border-[#8fadc033]"
                   type="email"
                   placeholder="Your email here"
                   value="usov.misha@gmail.com"
                   onChange={emailField => setEmail(emailField.target.value)}
            />
            <h2 className="text-[#8fadc0] text-xs mt-4 font-bold">Password</h2>
            <input className="bg-[#8fadc01a] w-full rounded border mt-2 p-2 text-white border-[#8fadc033]"
                   type="password"
                   placeholder="Password"
                   onChange={passwordField => setPassword(passwordField.target.value)}
            />
            <div className="flex justify-center pt-6">
                <button
                    className={buttonTheme}
                    onClick={register}
                >Get Started
                </button>
            </div>
            <div className="flex-col pt-8 text-xs text-center ">
                <span className="text-[#8fadc0]">By clicking the button, you agree to our
                    <a className="text-[#ffb81c] ml-2 cursor-pointer">Privacy Policy</a>
                </span>
                <br />
                <br />
                <span className="text-[#8fadc0] text-center">Already have an account?
                    <a className="text-[#ffb81c] ml-2 cursor-pointer" onClick={() => {
                        auth.state(Auth.LOGIN)
                    }}>Sign in here</a>
                </span>
            </div>
        </form>
    </div>
}