import {nonRoundedButtonTheme} from "../../../themes/Themes";

export function ProfileInfoComponent() {
    return <div className="space-y-2 max-w-[300px]">
        <h1 className="text-3xl text-start font-bold">License Author</h1>
        <div className="flex mt-2 justify-start items-center">
            <img className="w-12 h-12 rounded-full bg-black" />
            <div className="ml-4">
                <h1 className="text-start">Michai Usov</h1>
                <p>as person account</p>
            </div>
        </div>
        <p>He is an director of all films in production environemtn... </p>
        <div className="pt-4">
            <h2><a className="font-bold">Distribution start's at: </a> 21.20.2021 for 22.20.2021ewf ewfwwffwewfewfew</h2>
            <h2><a className="font-bold">Start conditions:</a> min 2000$</h2>
            <h1>Created at 23.11.2021</h1>
            <button className={nonRoundedButtonTheme + " mt-4 w-full"} onClick={() => {

            }}>Open chat
            </button>
        </div>
    </div>
}