import rightArrow from "../asserts/right_24px.png";
import {RoomResponse} from "../../../data/models/rooms/room/RoomResponse";

export interface RoomProfileItemProps {
    item: RoomResponse
    handleOpenRoom: (roomId: string) => void
}

export function RoomProfileItem({item, handleOpenRoom}: RoomProfileItemProps) {
    return <div
        key={(Math.random() + 1).toString(36).substring(7)}
        onClick={() => handleOpenRoom(item.roomId)}
        className="w-full lg:h-[50px] h-fit cursor-pointer rounded rounded-xl border-[#4a5058]
                hover:text-white rounded-xl border-2 hover:border-gray-500 flex justify-start items-center"
    >
        <div className="space-x-4 flex ml-6 justify-between items-center w-full mr-4">
            <div className="lg:flex p-2 lg:p-0 lg:space-x-4 lg:space-y-0 space-y-4 items-center w-full">
                <div className="flex space-x-4 items-center">
                    {item.isActive ? (<div className="bg-green-500 w-3 h-3 min-w-fit rounded rounded-full"/>) : (
                        <div className="bg-red-500 w-3 h-3 min-w-fit rounded rounded-full"/>)}
                    <h1 className="min-w-fit">{item.title}</h1>
                </div>
                <h2 className="line-clamp-1 min-w-fit w-max max-w-[170px]">{item.ownerName}</h2>
                {item.lastMessage !== null && <h1 className="lg:line-clamp-1 max-w-2xl">{item.lastMessage}</h1>}
                <h1 className="min-w-fit">Requirements: {item.requirements}</h1>
            </div>
            <div className="flex">
                <img alt="right arrow" className="w-8 h-8" src={rightArrow}/>
            </div>
        </div>
    </div>
}