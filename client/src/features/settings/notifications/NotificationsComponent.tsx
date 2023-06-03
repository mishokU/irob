import {SettingsStrings} from "../strings/SettingsStrings";
import {buttonTheme} from "../../../ui/themes/Themes";

export function NotificationsComponent() {
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white lg:w-[550px] w-full">
        <h1 className="text-xl font-bold">{SettingsStrings.Notifications}</h1>
        <p className="mt-4 text-[#8fadc0]">We will definitely notify you of any important changes,
            and you can choose the topics of the remaining notifications yourself.
        </p>
        <div className="mt-8">
            <h1 className="font-bold text-xl">In IROB</h1>
            <p className="text-[#8fadc0]">Choose which notifications to receive directly on IROB</p>
            <p className="text-[#8fadc0]">Emails will be later!</p>
        </div>
        <div className="mt-8">
            <div className="flex items-center mb-4">
                <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-white">New message in room</label>
            </div>
            <div className="flex items-center">
                <input
                    id="checked-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"/>
                <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-white">License create</label>
            </div>
        </div>
        <div className="flex space-x-2 mt-4">
            <button className={buttonTheme + " mt-4 w-full"}>Save</button>
        </div>
    </div>
}