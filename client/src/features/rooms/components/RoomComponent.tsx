import {RoommatesComponent} from "./RoommatesComponent";
import {RequirementsComponent} from "./RequirementsComponent";
import {RoomSmartMessengerComponent} from "./RoomSmartMessengerComponent";
import {BackButton} from "../../../ui/common/BackButton";
import {LeaveRoomButton} from "../../../ui/common/LeaveRoomButton";

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

    return <div>
        <LeaveRoomButton />
        <div className="flex justify-between m-16 space-x-4 pt-16">
            <RoommatesComponent />
            <RoomSmartMessengerComponent />
            <RequirementsComponent />
        </div>
    </div>
}