import useViewModel from "./UpdatePasswordViewModel"
import {Dispatch, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {ReactComponent as CloseModal} from "../../../../ui/assets/close_black_24dp.svg";
import {buttonTheme, inputStyle} from "../../../../themes/Themes";

export interface UpdatePasswordProps {
    newPassword: string
    setNewPassword: Dispatch<string>
    isVisible: boolean
    setIsVisible: Dispatch<boolean>
}

export function UpdatePasswordModal(props: UpdatePasswordProps) {
    const {
        oldPassword,
        setRepeatNewPassword,
        repeatNewPassword,
        setOldPassword,
        updatePasswordClick
    } = useViewModel(props)
    return <>
        <Transition appear show={props.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.setIsVisible(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50"/>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="transform border-2 border-[#29303A] transform overflow-hidden rounded-2xl
                            bg-[#0E1420] p-6 text-left align-middle shadow-xl w-[400px] transition-all">
                                <div className="space-y-3 text-white">
                                    <div className="flex items-center justify-between">
                                        <h1 className="font-bold text-lg">Password updating</h1>
                                        <button
                                            onClick={() => props.setIsVisible(false)}
                                            className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                            <CloseModal/>
                                        </button>
                                    </div>
                                    <div>
                                        <h1>Old password</h1>
                                        <input
                                            className={inputStyle + " bg-transparent w-full w-full flex"}
                                            value={oldPassword}
                                            onChange={(passwordField) => setOldPassword(passwordField.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <h1>New password</h1>
                                        <input
                                            className={inputStyle + " bg-transparent w-full w-full flex"}
                                            value={props.newPassword}
                                            onChange={(passwordField) => props.setNewPassword(passwordField.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <h1>Repeat new password</h1>
                                        <input
                                            className={inputStyle + " bg-transparent w-full w-full flex"}
                                            value={repeatNewPassword}
                                            onChange={(passwordField) => setRepeatNewPassword(passwordField.target.value)}
                                        />
                                    </div>
                                    <button
                                        className={buttonTheme + " w-full"}
                                        onClick={() => updatePasswordClick()}>
                                        Update
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}