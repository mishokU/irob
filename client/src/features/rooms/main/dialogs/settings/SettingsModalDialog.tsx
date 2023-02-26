import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {SettingsProps} from "./SettingsProps";
import {ReactComponent as CloseModal} from "../../../asserts/close_black_24dp.svg";
import {buttonTheme, inputStyle} from "../../../../../themes/Themes";
import useViewModel from "./SettingsViewModel"
import {UserSettingsModel} from "./UserSettingsModel";

export function SettingsModalDialog({isVisible, setIsVisible}: SettingsProps) {
    const {title, setTitle, search, setSearch, users, onUserClick, updateRoomClick} = useViewModel({
        isVisible,
        setIsVisible
    })
    function onClose() {
        setIsVisible(false)
    }

    return <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className=" transform border-2 border-[#29303A] transform overflow-hidden rounded-2xl
                            bg-[#0E1420] p-6 text-left align-middle shadow-xl w-[400px] transition-all">
                            <div className="space-y-3 text-white">
                                <div className="flex items-center justify-between">
                                    <h1 className="font-bold text-lg">Updating room</h1>
                                    <button onClick={() => {
                                        setIsVisible(false)
                                    }}
                                            className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                        <CloseModal />
                                    </button>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h1>Room title</h1>
                                        <input
                                            className={inputStyle + " bg-transparent w-full w-full flex"}
                                            placeholder="title"
                                            value={title}
                                            onChange={(titleField) => setTitle(titleField.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h1>Room privacy</h1>
                                        <h2>Find second person who will be second side of a deal, full email</h2>
                                        <input
                                            className={inputStyle + " bg-transparent w-full w-full flex"}
                                            placeholder="Search by email"
                                            value={search}
                                            onChange={(searchField) => setSearch(searchField.target.value)}
                                        />
                                        <ul className="list-none w-full max-h-[200px] bg-black">
                                            {users?.map((user: UserSettingsModel) => (<li
                                                key={user.userId}
                                                onClick={() => onUserClick(user)}
                                                className="pt-2 pl-4 pr-4 pb-2 border-[#29303A] border-2 rounded-lg cursor-pointer"
                                            >{user.username}</li>))}
                                        </ul>
                                    </div>
                                </div>
                                <button className={buttonTheme + " w-full"} onClick={updateRoomClick}>Update</button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
}