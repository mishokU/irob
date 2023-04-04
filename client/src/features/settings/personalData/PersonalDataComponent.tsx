import {SettingsStrings} from "../strings/SettingsStrings";
import {buttonTheme} from "../../../themes/Themes";
import useViewModel from "./PersonalInformationViewModel"

export function PersonalDataComponent() {
    const {handleUpdateData, handleUndoData} = useViewModel()
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white w-[550px]">
        <h1 className="text-xl font-bold">{SettingsStrings.PersonalData}</h1>
        <p className="mt-4 text-[#8fadc0]">Edit basic personal information to improve recommendations. This information
            is confidential and will not appear on your public profile.
        </p>
        <div className="mt-8">
            <p className="mt-4">Country / Region</p>
            <input
                placeholder="USA"
                className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full"/>
        </div>
        <div className="mt-8">
            <p className="mt-4">Language</p>
            <input
                placeholder="English"
                className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full"/>
        </div>
        <div className="flex space-x-2">
            <button
                className={buttonTheme + " mt-4 w-full"}
                onClick={handleUpdateData}>
                Save
            </button>
            <button
                className={buttonTheme + " mt-4 w-full"}
                onClick={handleUndoData}>
                Reset
            </button>
        </div>
    </div>
}