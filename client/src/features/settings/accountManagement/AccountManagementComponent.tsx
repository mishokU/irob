import {SettingsStrings} from "../strings/SettingsStrings";
import {buttonTheme} from "../../../themes/Themes";
import useViewModel from "./AccountManagementViewModel"

export function AccountManagementComponent() {
    const {profileReducer} = useViewModel()
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white w-[550px]">
        <h1 className="text-xl font-bold">{SettingsStrings.AccountManagement}</h1>
        <p className="mt-4 text-[#8fadc0]">Make changes to your email address, password, and account type.
            This information is confidential and will not appear on your public profile.
        </p>
        <div className="mt-8">
            <p className="mt-4">E-mail • Hidden information</p>
            <input
                value={profileReducer.email}
                className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full"/>
        </div>
        <div className="mt-8">
            <p className="mt-4">Password</p>
            <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full"/>
        </div>
        <h1 className="text-xl mt-8 font-bold">Change account</h1>
        <h2 className="text-lg mt-6">Convert personal account to business account</h2>
        <p className="mt-6 text-[#8fadc0]">Take your business and brand to the next level with tools like advertising
            and analytics. Your content, profile, and followers will remain unchanged.
        </p>
        <div className="flex mt-4 justify-between items-center">
            <div>
                <h2 className="text-lg">Disable Account</h2>
                <p className="text-[#8fadc0] text-base">Hide pins and profile</p>
            </div>
            <div>
                <button className={buttonTheme + " w-full min-w-[120px] m-auto"} onClick={() => {

                }}>Reset
                </button>
            </div>
        </div>
        <div className="flex mt-4 justify-between items-center">
            <div>
                <h2 className="text-lg">Deleting data and account</h2>
                <p className="text-[#8fadc0] text-base">Delete account and its data</p>
            </div>
            <div>
                <button className={buttonTheme + " m-auto min-w-[120px] w-full"} onClick={() => {

                }}>Delete
                </button>
            </div>
        </div>
    </div>
}