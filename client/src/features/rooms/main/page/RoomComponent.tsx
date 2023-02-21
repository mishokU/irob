import {RoommatesComponent} from "../../roommates/RoommatesComponent";
import {RequirementsMainComponent} from "../../requirements/RequirementsMainComponent";
import {RoomSmartMessengerComponent} from "../../messenger/RoomSmartMessengerComponent";
import useViewModel from "./RoomViewModel";
import deleteImg from "../../../../ui/assets/delete_96px.png";
import settingsImg from "../../asserts/settings_480px.png"
import {DeleteEntityDialog} from "../dialogs/deleteRoom/DeleteEntityDialog";
import {CreateRequirementsDialog} from "../dialogs/createRequirement/CreateRequirementsDialog";
import backImg from "../../../../ui/assets/left_24px.png";
import {SettingsModalDialog} from "../dialogs/settings/SettingsModalDialog";

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
        isRequirementsDialogVisible,
        setIsRequirementsDialogVisible,
        isContentVisible,
        setIsSettingsDialogVisible,
        isSettingsDialogVisible,
        onBackClick
    } = useViewModel()

    return <div>
        {isDeleteDialogVisible && <DeleteEntityDialog
            isDeleteDialogVisible={isDeleteDialogVisible}
            setIsDeleteDialogVisible={setIsDeleteDialogVisible}
            handleDeleteRoomClick={handleDeleteRoomClick}
        />}
        {isRequirementsDialogVisible && <CreateRequirementsDialog
            isVisible={isRequirementsDialogVisible}
            setIsVisible={setIsRequirementsDialogVisible}
            roomName={roomReducer.roomName}
        />}
        {isSettingsDialogVisible && <SettingsModalDialog
            isVisible={isSettingsDialogVisible}
            setIsVisible={setIsSettingsDialogVisible} />}
        {isContentVisible && <div>
            <button
                type="button"
                onClick={onBackClick}
                className="bg-[#ffb81c] absolute mt-8 ml-8 z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
                <img src={backImg} />
                <span className="sr-only">Icon description</span>
            </button>
            <div className="pt-12 flex justify-center items-center space-x-2 text-2xl">
                <h1 className="text-yellow-300">Room:</h1>
                <h2 className="text-white">{roomReducer.roomId}</h2>
            </div>
            {roomReducer.isAdmin && <button
                type="button"
                onClick={() => {
                    setIsDeleteDialogVisible(!isDeleteDialogVisible)
                }}
                className="bg-red-600 z-10 absolute right-8 top-8 rounded-full w-14 h-14 p-4 text-center inline-flex">
                <img src={deleteImg} />
                <span className="sr-only">Icon description</span>
            </button>}
            <button
                type="button"
                onClick={() => {
                    setIsSettingsDialogVisible(!isSettingsDialogVisible)
                }}
                className="bg-[#ffb81c] z-10 absolute right-24 top-8 rounded-full w-14 h-14 p-4 text-center inline-flex">
                <img src={settingsImg} />
                <span className="sr-only">Icon description</span>
            </button>
            <div className="flex justify-between ml-16 mr-16 mb-16 space-x-4 pt-16">
                <RoommatesComponent />
                <RoomSmartMessengerComponent
                    roomName={roomReducer.roomName}
                    setIsVisible={setIsRequirementsDialogVisible}
                    isVisible={isRequirementsDialogVisible}
                />
                <RequirementsMainComponent
                    isVisible={isRequirementsDialogVisible}
                    setIsVisible={setIsRequirementsDialogVisible}
                />
            </div>
        </div>}
    </div>
}