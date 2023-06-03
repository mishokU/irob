import {RoommatesComponent} from "../../roommates/RoommatesComponent";
import {RequirementsMainComponent} from "../../requirements/RequirementsMainComponent";
import {RoomSmartMessengerMainComponent} from "../../messenger/main/RoomSmartMessengerMainComponent";
import useViewModel from "./RoomViewModel";
import deleteImg from "../../../../ui/assets/delete_96px.png";
import settingsImg from "../../asserts/settings_480px.png"
import {DeleteEntityDialog} from "../dialogs/deleteRoom/DeleteEntityDialog";
import {CreateRequirementsDialog} from "../dialogs/createRequirement/CreateRequirementsDialog";
import backImg from "../../../../ui/assets/left_24px.png";
import {SettingsModalDialog} from "../dialogs/settings/SettingsModalDialog";
import {MakeDealDialog} from "../dialogs/makeDeal/MakeDealDialog";
import documentImg from "../../asserts/document.png"
import documentRequirement from "../../asserts/requirements_icon.png"
import room_users_icon from "../../asserts/room_users_icon.png"

/*
    Комната с комнонентами
    Слева будет участники, кол-во, и макс участников, каждая карточка - это пользователь, кто главный, у того иконка главного
    По центру будет само окно чата, в котором они смогут переписываться и заключать условия
    Сами условия будут расположены справа, и в них будет две кнопки: принять, отклонить условие
    Также будут кнопки отправки сообщений в чат, и будет одна чуть побольше, которая будет спрашивать у всех
    Согласны ли все с условиями договора, если нет, то чат продолжается
    Если да - то, берутся все условия и записываются в смарт-контракт
    Далее происходит оплата с обеих сторон, чтобы этот контракт попал в блокчейн
 */

export function RoomComponent() {
    const {
        roomReducer,
        isDeleteDialogVisible,
        handleDeleteRoomClick,
        setIsDeleteDialogVisible,
        isContentVisible,
        setIsSettingsDialogVisible,
        isSettingsDialogVisible,
        isRequirementVisible,
        setIsRequirementVisible,
        isMakeDealDialogVisible,
        setIsMakeDealDialogVisible,
        isUsersVisible,
        isRequirementsVisible,
        isPaymentButtonVisible,
        setIsUsersVisible,
        setIsRequirementsVisible,
        onBackClick,
        error,
        onShowCardClick
    } = useViewModel()

    return <div className="h-screen overflow-y-hidden">
        {isDeleteDialogVisible && <DeleteEntityDialog
            isDeleteDialogVisible={isDeleteDialogVisible}
            setIsDeleteDialogVisible={setIsDeleteDialogVisible}
            handleDeleteRoomClick={handleDeleteRoomClick}
        />}
        {isRequirementVisible && <CreateRequirementsDialog
            isVisibleState={isRequirementVisible}
            setIsVisibleState={setIsRequirementVisible}
        />}
        {isSettingsDialogVisible && <SettingsModalDialog
            isVisible={isSettingsDialogVisible}
            setIsVisible={setIsSettingsDialogVisible}/>}
        {isMakeDealDialogVisible && <MakeDealDialog
            isVisible={isMakeDealDialogVisible}
            setIsVisible={setIsMakeDealDialogVisible}
        />}
        {isContentVisible && <div className="h-full">
            <button
                type="button"
                onClick={onBackClick}
                className="bg-[#ffb81c] absolute mt-8 lg:ml-8 ml-4 z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
                <img src={backImg}/>
                <span className="sr-only">Icon description</span>
            </button>
            <div className="lg:pt-12 pt-32 flex justify-center items-center text-2xl">
                <div className="flex justify-between items-center w-full pr-4 pl-4">
                    <div
                        onClick={() => setIsUsersVisible(!isUsersVisible)}
                        className="lg:hidden block bg-[#ffb81c] rounded-full p-2 h-fit">
                        <img className="w-[30px] h-[30px]" src={room_users_icon}/>
                    </div>
                    <div className="flex space-x-2 m-auto">
                        <h1 className="text-yellow-300">Room:</h1>
                        <h2 className="text-white">{roomReducer.roomId}</h2>
                    </div>
                    <div
                        onClick={() => setIsRequirementsVisible(!isRequirementsVisible)}
                        className="lg:hidden block bg-[#ffb81c] rounded-full p-2 h-fit">
                        <img className="w-[30px] h-[30px]" src={documentRequirement}/>
                    </div>
                </div>
            </div>
            <div className="z-10 absolute right-8 top-8">
                <div className="space-x-4">
                    <button
                        type="button"
                        onClick={() => onShowCardClick()}
                        className="bg-[#ffb81c] z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
                        <img src={documentImg}/>
                        <span className="sr-only">Icon description</span>
                    </button>
                    {roomReducer.isAdmin && <button
                        type="button"
                        onClick={() => {
                            setIsSettingsDialogVisible(!isSettingsDialogVisible)
                        }}
                        className="bg-[#ffb81c] z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
                        <img src={settingsImg}/>
                        <span className="sr-only">Icon description</span>
                    </button>}
                    {roomReducer.isAdmin && <button
                        type="button"
                        onClick={() => {
                            setIsDeleteDialogVisible(!isDeleteDialogVisible)
                        }}
                        className="bg-red-600 rounded-full w-14 h-14 p-4 text-center inline-flex">
                        <img src={deleteImg}/>
                        <span className="sr-only">Icon description</span>
                    </button>}
                </div>
            </div>
            <div
                className="flex justify-between lg:ml-16 ml-4 lg:mr-16 mr-4 mb-16 lg:space-x-4 space-x-0 h-full lg:pt-16 pt-2">
                {isUsersVisible && <RoommatesComponent isVisible={isUsersVisible}/>}
                {((!isUsersVisible && !isRequirementsVisible) || window.innerWidth > 920) && <RoomSmartMessengerMainComponent
                    roomName={roomReducer.roomName}
                    setIsVisible={setIsMakeDealDialogVisible}
                    isVisible={isMakeDealDialogVisible}
                    isDealButtonVisible={isPaymentButtonVisible}
                />}
                {isRequirementsVisible && <RequirementsMainComponent
                    isVisibleState={isRequirementVisible}
                    setIsVisibleState={setIsRequirementVisible}
                />}
            </div>
        </div>}
        {error !== null && <div
            className="text-red-600 text-2xl absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">{error}</div>}
    </div>
}