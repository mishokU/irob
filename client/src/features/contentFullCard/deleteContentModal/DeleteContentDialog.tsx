import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {DeleteContentDialogProms} from "./DeleteDialogProms";
import {buttonTheme} from "../../../themes/Themes";

export function DeleteContentDialog({
                                        isDeleteDialogVisible,
                                        setIsDeleteDialogVisible,
                                        handleDeleteRoomClick
                                    }: DeleteContentDialogProms) {
    function onClose() {
        setIsDeleteDialogVisible(false)
    }

    return <Transition appear show={isDeleteDialogVisible} as={Fragment}>
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
                <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                        <Dialog.Panel className="
                        transform border-2 border-[#29303A] transform overflow-hidden rounded-2xl
                            bg-[#0E1420] p-6 text-left align-middle shadow-xl w-[400px] transition-all">
                            <div className="space-y-4">
                                <h1 className="text-white text-xl">Are you sure to delete your content?</h1>
                                <button
                                    className={buttonTheme + " bg-red-600 w-full h-[40px] text-white"}
                                    type="button"
                                    onClick={handleDeleteRoomClick}>
                                    <h1>Delete</h1>
                                </button>
                                <button
                                    className={buttonTheme + " w-full h-[40px] text-white"}
                                    type="button"
                                    onClick={onClose}>
                                    <h1>Cancel</h1>
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
}