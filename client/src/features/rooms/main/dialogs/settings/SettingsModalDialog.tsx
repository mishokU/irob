import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {SettingsProps} from "./SettingsProps";
import {ReactComponent as CloseModal} from "../../../asserts/close_black_24dp.svg";
import {buttonTheme, inputStyle} from "../../../../../themes/Themes";
import useViewModel from "./SettingsViewModel"

export function SettingsModalDialog({isVisible, setIsVisible}: SettingsProps) {
    const {title, setTitle, updateRoomClick} = useViewModel({isVisible, setIsVisible})

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
                                <div>
                                    <input
                                        className={inputStyle + " bg-transparent w-full w-full flex"}
                                        placeholder="Room title"
                                        value={title}
                                        onChange={(titleField) => setTitle(titleField.target.value)}
                                    />
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