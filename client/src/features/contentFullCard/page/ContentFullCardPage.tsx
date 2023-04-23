import backImg from "../../../ui/assets/left_24px.png";
import useViewModel from "./ContentFullCardPageViewModel"
import {ProfileInfoComponent} from "../components/ProfileInfoComponent";
import {BookmarkOutFilledIcon} from "../../../ui/common/icons/BookmarkOutFilledIcon";
import {ComplaintIcon} from "../../../ui/common/icons/ComplaintIcon";
import {buttonTheme} from "../../../themes/Themes";
import useCreateRoomViewModel from "../../rooms/main/dialogs/createRoom/CreateRoomViewModel";
import {useErrorToast} from "../../../ui/common/ToastErrorComponent";
import {IROBProgressBar} from "../../../ui/common/IROBProgressBar";
import {DeleteContentDialog} from "../deleteContentModal/DeleteContentDialog";
import deleteImg from "../../../ui/assets/delete_96px.png";

export function ContentFullCardPage() {

    const {setErrorMessage} = useErrorToast()
    const {createRoom} = useCreateRoomViewModel(setErrorMessage)

    const {
        onBackClick,
        state,
        setIsDeleteDialogVisible,
        isDeleteDialogVisible,
        handleDeleteCardClick
    } = useViewModel()

    return <div className="h-screen overflow-y-hidden relative">
        <button
            type="button"
            onClick={onBackClick}
            className="bg-[#ffb81c] absolute mt-8 ml-8 z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
            <img src={backImg}/>
            <span className="sr-only">Icon description</span>
        </button>
        <div className="z-10 absolute right-8 top-8">
            {state.isDeleteDialogButtonVisible && <button
                type="button"
                onClick={() => {
                    setIsDeleteDialogVisible(!isDeleteDialogVisible)
                }}
                className="bg-red-600 rounded-full w-14 h-14 p-4 text-center inline-flex">
                <img src={deleteImg}/>
                <span className="sr-only">Icon description</span>
            </button>}
        </div>
        {isDeleteDialogVisible && <DeleteContentDialog
            isDeleteDialogVisible={isDeleteDialogVisible}
            setIsDeleteDialogVisible={setIsDeleteDialogVisible}
            handleDeleteRoomClick={handleDeleteCardClick}
        />}
        <div className="absolute right-0 left-0">
            <h1>Content card</h1>
        </div>
        {state.isLoading && <IROBProgressBar/>}
        {<div className="h-full">
            <div className="pt-12 flex justify-center items-center space-x-2 text-4xl">
                <h1 className="text-yellow-300 ">Content card</h1>
            </div>
            <div className="flex space-x-4 pt-12 pl-32 pr-32 pb-12 mt-4">
                <div className="flex">
                    <div className="flex text-white w-[500px]">
                        <div className="max-w-lg pr-16 space-y-4">
                            <div className="flex space-x-4">
                                <div className="text-3xl font-bold">{state.content.name}</div>
                                <BookmarkOutFilledIcon/>
                                <ComplaintIcon/>
                            </div>
                            <div className="mt-4 flex space-x-2 text-white">
                                <p>{state.content.type}</p>
                                <p>{state.content.year}</p>
                                <p>{state.content.duration}</p>
                            </div>
                            <div>
                                <p>{state.content.description}</p>
                            </div>
                            <div>
                                <p>{state.content.genres}</p>
                            </div>
                            <div className="grid-cols-2 gap-2">
                                <div className="flex space-x-4">
                                    <h1>Country</h1>
                                    <p>{state.content.country}</p>
                                </div>
                            </div>
                            <p className="mt-16">Watch the video and sing up here!</p>
                            <ProfileInfoComponent state={state}/>
                        </div>
                    </div>
                    <div>
                        <img
                            placeholder="bg-black"
                            src={state.content.videoPreview}
                            className="w-[54em] h-[33em] bg-black rounded-2xl"/>
                        <div className="flex space-x-4">
                            {state.content.videoTrailerUrl &&
                                <button className={buttonTheme + " mt-4 w-full"} onClick={() => {

                                }}>Play trailer
                                </button>}
                            {state.isCreateRoomButtonVisible &&
                                <button
                                    className={buttonTheme + " mt-4 w-full"}
                                    onClick={() => {
                                        createRoom(state.content.id, state.user.userId)
                                    }}>Open chat
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}