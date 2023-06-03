import useViewModel from "./RoomsProfileViewModel";
import {RoomProfileItem} from "./RoomProfileItem";

export function RoomsProfilePage() {
    const {rooms, handleOpenRoom, isEmptyVisible} = useViewModel()
    return <div className="overscroll-y-auto">
        <div className="space-y-2">
            {rooms.length > 0 && rooms.map((item) =>
                <RoomProfileItem item={item} handleOpenRoom={handleOpenRoom}/>)}
        </div>
        {isEmptyVisible && <div className="ml-2 text-xl text-[#8fadc0]">
            You do not have any rooms!
        </div>}
    </div>
}