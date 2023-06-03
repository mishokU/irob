import {SettingsStrings} from "../strings/SettingsStrings";
import useViewModel from "./NetworkViewModel"
import {buttonTheme} from "../../../ui/themes/Themes";

export function NetworkComponent() {
    const {updateNetwork, networks, setNetwork} = useViewModel()
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white lg:w-[550px] w-full">
        <h1 className="text-xl font-bold">{SettingsStrings.NetworkChanger}</h1>
        <p className="mt-4 text-[#8fadc0]">Admins can change network url</p>
        <div className="space-y-4">
            <label htmlFor="networks" className="block mb-2 text-sm font-medium text-gray-900">Select an
                option</label>
            <select
                onChange={(network) => setNetwork(network.target.value)}
                id="networks"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                {networks.map((network) => <option
                    selected={network.isEnabled}
                    key={network.id} className="p-2"
                    value={network.name}>{network.name}
                </option>)}
            </select>
            <button
                onClick={updateNetwork}
                className={buttonTheme}>
                Update
            </button>
        </div>
    </div>
}