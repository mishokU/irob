import {StateProps} from "../modal/ContentFullCardComponent";

export function ProfileInfoComponent({state}: StateProps) {
    return <div className="space-y-2 max-w-[400px] text-white">
        <h1 className="text-3xl text-start font-bold">License Author</h1>
        {state.user.isDeleted && <div>
            <h2>User deleted</h2>
        </div>}
        {!state.user.isDeleted && <div>
            <div className="flex mt-2 justify-start items-center">
                <img
                    src={state.user.avatar}
                    className="w-12 h-12 rounded-full bg-white"/>
                <div className="ml-4">
                    <h1 className="text-start">{state.user.username}</h1>
                    <p>as person account</p>
                </div>
            </div>
            <div className="pt-4 space-y-4">
                <h2><a className="font-bold">Distribution start's
                    at: </a>{state.content.startDate} for {state.content.endDate}</h2>
                <h2><a className="font-bold">Start conditions:</a> min {state.content.startCost} ETH</h2>
                <h1>Created at {state.content.creationDate}</h1>
            </div>
        </div>}
    </div>
}