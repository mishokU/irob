import {buttonTheme} from "../../../themes/Themes";
import {StateProps} from "../modal/ContentFullCardComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import useCreateRoomViewModel from "../../rooms/main/dialogs/createRoom/CreateRoomViewModel"
import {useErrorToast} from "../../../ui/common/ToastErrorComponent";
import {initContentProps, useContentFullCardContext} from "../../main/contexts/ContentFullCardProvider";

export function ProfileInfoComponent({state}: StateProps) {
    const profileReducer = useSelector((state: RootState) => state.profile)
    const useContext = useContentFullCardContext()

    const {setErrorMessage} = useErrorToast()
    const {createRoom} = useCreateRoomViewModel(setErrorMessage)
    return <div className="space-y-2 max-w-[300px] text-white">
        <h1 className="text-3xl text-start font-bold">License Author</h1>
        <div className="flex mt-2 justify-start items-center">
            <img src={state.user.avatar} className="w-12 h-12 rounded-full"/>
            <div className="ml-4">
                <h1 className="text-start">{state.user.username}</h1>
                <p>as person account</p>
            </div>
        </div>
        <p>{state.user.description}</p>
        <div className="pt-4">
            <h2><a className="font-bold">Distribution start's
                at: </a>{state.content.startDate} for {state.content.endDate}</h2>
            <h2><a className="font-bold">Start conditions:</a> min {state.content.startCost} ETH</h2>
            <h1>Created at {state.content.creationDate}</h1>
            {profileReducer.profileId !== state.user.userId && useContext?.isVisibleProps.fromCatalogue &&
                <button
                    className={buttonTheme + " mt-4 w-full"}
                    onClick={() => {
                        createRoom(state.content.id, state.user.userId)
                        useContext?.setVisibility(initContentProps())
                    }}>Open chat
                </button>
            }
        </div>
    </div>
}