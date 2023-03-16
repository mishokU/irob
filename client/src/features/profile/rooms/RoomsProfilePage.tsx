import useViewModel from "./RoomsProfileViewModel";
import rightArrow from "../asserts/right_24px.png";

export function RoomsProfilePage() {
    const {rooms, handleOpenRoom} = useViewModel()
    return <div className="overscroll-y-auto">
        <div className="space-y-2">
            {rooms.length > 0 && rooms.map((item) => (<div
                key={(Math.random() + 1).toString(36).substring(7)}
                onClick={() => {
                    handleOpenRoom(item.roomId)
                }}
                className="w-full h-[50px] cursor-pointer rounded rounded-xl border-[#4a5058]
                hover:text-white rounded-xl border-2 hover:border-gray-500 flex justify-start items-center"
            >
                <div className="space-x-4 flex ml-6 justify-between items-center w-full mr-4">
                    <div className="flex space-x-4 items-center w-full">
                        {item.isActive ? (<div className="bg-green-500 w-3 h-3 min-w-fit rounded rounded-full" />) : (
                            <div className="bg-red-500 w-3 h-3 rounded rounded-full" />)}
                        <h1 className="min-w-fit">{item.title}</h1>
                        <h2 className="line-clamp-1 min-w-fit w-max max-w-[170px]">{item.ownerName}</h2>
                        <h1 className="line-clamp-1 max-w-4xl">{item.lastMessage}</h1>
                        <h1 className="min-w-fit">Requirements: {item.requirements}</h1>
                    </div>
                    <div className="flex">
                        <img className="w-8 h-8" src={rightArrow} />
                    </div>
                </div>
            </div>))}
        </div>
    </div>
}