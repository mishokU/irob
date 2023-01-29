import React from "react";

export function RoomsFeedComponent() {
    return <div className="h-screen w-screen">
        <div className="pt-8 pl-12 ml-36">
            <div>
                <h1 className="text-2xl pb-4 text-white">Rooms</h1>
                <div className="text-white pb-4 text-[#8fadc0]">This is rooms page where you can find 
                </div>
                <input className="4px initial px-4 text-black w-[450px] h-10"
                       type="text"
                       placeholder="Search licenses..."
                />
            </div>
        </div>
    </div>
}