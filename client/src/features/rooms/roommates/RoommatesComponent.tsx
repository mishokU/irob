import useViewModel from "./RoommatesViewModel"
import starImg from "../asserts/star_48px.png"
import {IROBProgressBar} from "../../../ui/common/IROBProgressBar";
import avatarPlaceholder from "../../../ui/assets/avatart_placeholder.png"

export function RoommatesComponent() {
    const {users} = useViewModel()
    return <div className="w-[300px] relative min-w-[300px] text-white">
        <div className="flex text-2xl space-x-4">
            <div>Users</div>
        </div>
        {users.length === 0 && <IROBProgressBar/>}
        {users.length > 0 && <div
            className="border-2 border-[#29303A] p-4 mt-4 space-y-4 h-fit rounded-lg overflow-y-scroll max-h-[calc(100vh-230px)] scrollbar">
            {users.map((user) => (<div
                key={(Math.random() + 1).toString(36).substring(7)}
                className="text-start text-2xl rounded-lg truncate">
                <div className="flex items-center cursor-pointer hover:bg-gray-800 p-2 justify-between">
                    <div className="flex space-x-4">
                        <img
                            alt="avatar"
                            placeholder={avatarPlaceholder}
                            src={user.avatar}
                            className="object-cover rounded-full bg-white w-8 h-8"/>
                        <h1 className="select-none max-w-[200px] truncate overflow-hidden">{user.fullName}</h1>
                    </div>
                    {user.isAdmin && <img alt="admin" src={starImg} className="w-6 h-6"/>}
                </div>
            </div>))}
        </div>
        }
    </div>
}