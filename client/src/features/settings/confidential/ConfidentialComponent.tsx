import {SettingsStrings} from "../strings/SettingsStrings";
import {buttonTheme} from "../../../themes/Themes";


export function ConfidentialComponent() {
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white w-[550px]">
        <h1 className="text-xl font-bold">{SettingsStrings.PrivacyData}</h1>
        <p className="mt-4 text-[#8fadc0]">Choose whether you want your Pinterest profile to be hidden from search
            engines and what data we use
            to show you recommendations and ads that might be of interest to you.
        </p>
        <div className="mt-8">
            <h1 className="text-2xl">Search engine privacy</h1>
            <div className="flex space-x-4 mt-4">
                <div className="flex items-center">
                    <input
                        id="checked-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                </div>
                <h2>Hide profile from search engines (eg Google).</h2>
            </div>
        </div>
        <div className="flex space-x-2 mt-4">
            <button className={buttonTheme + " mt-4 w-full"}>Save</button>
        </div>
    </div>
}