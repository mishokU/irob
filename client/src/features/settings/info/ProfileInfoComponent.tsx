import {buttonTheme} from "../../../themes/Themes";
import {SettingsStrings} from "../strings/SettingsStrings";

export function ProfileInfoComponent() {

    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white">
        <h1 className="text-3xl">{SettingsStrings.PublicProfile}</h1>
        <p>Your profile will be able to see the specified information</p>
        <p className="mt-4">Photo</p>
        <div className="flex items-center">
            <img className="rounded-full bg-white w-[75px] h-[75px]" />
            <p className="rounded-full ml-6 bg-[#4a5058] pt-2 pl-4 pr-4 pb-2">Change</p>
        </div>
        <div className="flex">
            <div>
                <p className="mt-4">Name</p>
                <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2" />
            </div>
            <div className="ml-4">
                <p className="mt-4">Surname</p>
                <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2" />
            </div>
        </div>
        <div>
            <p className="mt-4">Description</p>
            <textarea className="border-[#29303A] align-text-top border-2 rounded-2xl p-4 bg-transparent mt-2 w-full h-[100px]" />
        </div>
        <div>
            <p className="mt-4">Website</p>
            <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <div>
            <p className="mt-4">Location</p>
            <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <div>
            <p className="mt-4">Languages</p>
            <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <div className="flex space-x-2">
            <button className={buttonTheme + " mt-4 w-full"} onClick={() => {

            }}>Save</button>
            <button className={buttonTheme + " mt-4 w-full"} onClick={() => {

            }}>Reset</button>
        </div>
    </div>
}