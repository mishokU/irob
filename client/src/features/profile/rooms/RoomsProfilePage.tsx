import useViewModel from "./RoomsProfileViewModel";

export function RoomsProfilePage() {
    const {rooms, handleOpenRoom} = useViewModel()
    return <div className="overscroll-y-auto">
        <div className="gap-4 grid grid-cols-5">
            {rooms.length > 0 && rooms.map((item) => (
                <div key={(Math.random() + 1).toString(36).substring(7)}
                     onClick={() => {
                         handleOpenRoom(item)
                     }}
                     className="w-full h-[50px] pl-4 cursor-pointer rounded rounded-xl border-[#4a5058]
                     hover:text-white rounded-xl border-2 hover:border-gray-500 flex justify-start items-center">
                    <p>{item}</p>
                </div>))}
        </div>
    </div>
}