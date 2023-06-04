import backImg from "../../../ui/assets/left_24px.png";
import useViewModel from "./ContentFullCardPageViewModel"
import { ProfileInfoComponent } from "../components/ProfileInfoComponent";
import { BookmarkOutFilledIcon } from "../../../ui/common/icons/BookmarkOutFilledIcon";
import { ComplaintIcon } from "../../../ui/common/icons/ComplaintIcon";
import { buttonTheme } from "../../../ui/themes/Themes";
import useCreateRoomViewModel from "../../rooms/main/dialogs/createRoom/CreateRoomViewModel";
import { useErrorToast } from "../../../ui/common/ToastErrorComponent";
import { IROBProgressBar } from "../../../ui/common/IROBProgressBar";
import { DeleteContentDialog } from "../deleteContentModal/DeleteContentDialog";
import deleteImg from "../../../ui/assets/delete_96px.png";
import ReactPlayer from "react-player";

export function ContentFullCardPage() {

    const { setErrorMessage } = useErrorToast()
    const { createRoom } = useCreateRoomViewModel(setErrorMessage)

    const {
        onBackClick,
        state,
        setIsDeleteDialogVisible,
        onHandlePlayerVisible,
        isDeleteDialogVisible,
        handleDeleteCardClick
    } = useViewModel()

    return <div className="overflow-y-hidden relative">
        <button
            type="button"
            onClick={onBackClick}
            className="bg-[#ffb81c] absolute lg:mt-8 mt-4 lg:ml-8 ml-4 z-10 rounded-full lg:w-14 lg:h-14 w-10 h-10 lg:p-4 p-2 text-center inline-flex">
            <img src={backImg} />
            <span className="sr-only">Icon description</span>
        </button>
        <div className="z-10 absolute lg:right-8 right-4 lg:top-8 top-4">
            {state.isDeleteDialogButtonVisible && <button
                type="button"
                onClick={() => setIsDeleteDialogVisible(!isDeleteDialogVisible)}
                className="bg-red-600 rounded-full lg:w-14 lg:h-14 w-10 h-10 lg:p-4 p-2 text-center inline-flex">
                <img alt="delete" src={deleteImg} />
                <span className="sr-only">Icon description</span>
            </button>}
        </div>
        {isDeleteDialogVisible && <DeleteContentDialog
            isDeleteDialogVisible={isDeleteDialogVisible}
            setIsDeleteDialogVisible={setIsDeleteDialogVisible}
            handleDeleteRoomClick={handleDeleteCardClick}
        />}
        {state.isLoading && <IROBProgressBar />}
        {<div className="h-full">
            {state.isTrailerVisible && <ReactPlayer
                controls={true}
                height='100%'
                width='100%'
                url={state.content.videoTrailerUrl}
            />}
            {(!state.isTrailerVisible && !state.isLoading) && <div>
                <div className="lg:pt-12 pt-5 flex justify-center items-center space-x-2 lg:text-4xl text-2xl">
                    <h1 className="text-yellow-300">Content card</h1>
                </div>
                <div className="flex justify-center items-center space-x-4 lg:pt-12 pt-4 lg:pl-32 pl-4 lg:pr-32 pr-4 pb-12 mt-4">
                    <div className="lg:flex lg:space-y-0 space-y-4">
                        <div className="flex text-white lg:w-[500px] w-full">
                            <div className="max-w-lg pr-8 space-y-4">
                                <div className="flex space-x-4">
                                    <div
                                        className="max-w-full text-3xl line-clamp-1 font-bold">{state.content.name}</div>
                                    <BookmarkOutFilledIcon />
                                    <ComplaintIcon />
                                </div>
                                <div className="mt-4 mr-4 max-w-full flex space-x-2 text-white">
                                    <p>{state.content.type}</p>
                                    <p>{state.content.year}</p>
                                    <p>{state.content.duration}</p>
                                </div>
                                <div>
                                    <p className="line-clamp-1 max-w-full mr-4">{state.content.description}</p>
                                </div>
                                <div>
                                    <p className="line-clamp-1">{state.content.genres}</p>
                                </div>
                                <div className="grid-cols-2 gap-2">
                                    <div className="flex space-x-4">
                                        <h1>Country</h1>
                                        <p className="line-clamp-1">{state.content.country}</p>
                                    </div>
                                </div>
                                <p className="mt-16">Watch the video and sing up here!</p>
                                <ProfileInfoComponent state={state} />
                            </div>
                        </div>
                        <div>
                            <img
                                alt="preview"
                                placeholder="bg-black"
                                src={state.content.videoPreview}
                                className="lg:w-[54em] w-full lg:h-[33em] h-full bg-black rounded-2xl" />
                            <div className="ml-1 mr-1 flex space-x-4">
                                {state.content.videoTrailerUrl !== "null" && <button
                                    className={buttonTheme + " mt-4 w-full"}
                                    onClick={() => onHandlePlayerVisible()}>
                                    Play trailer
                                </button>}
                                {state.isCreateRoomButtonVisible && <button
                                    className={buttonTheme + " mt-4 w-full"}
                                    onClick={() => createRoom(state.content.id, state.user.userId)}>
                                    Open chat
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>}
    </div>
}