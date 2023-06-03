import {SettingsStrings} from "../strings/SettingsStrings";


export function LedgerComponent() {
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white lg:w-[550px] w-full">
        <h1 className="text-xl font-bold">{SettingsStrings.Ledger}</h1>
        <p className="mt-4 text-[#8fadc0]">There will be settings for your wallet, such as personal
            settings, wallet privacy, sending and receiving currency, as well as authentication when using a wallet
        </p>
        <div className="mt-8">
            <p className="mt-4 text-2xl">Developing...</p>
        </div>
    </div>
}