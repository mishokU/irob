import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {useCreateRoomModalContext} from "../../../../main/CreateRoomModalProvider";
import {ReactComponent as CloseModal} from "../../../asserts/close_black_24dp.svg";
import {ReactComponent as CopyIcon} from "../../../asserts/content_copy_white_24dp.svg";
import useViewModel from "./CreateRoomViewModel";
import {useErrorToast} from "../../../../../ui/common/ToastErrorComponent";
import {buttonTheme, inputStyle} from "../../../../../themes/Themes";

export function CreateRoomModal() {
    const {message, setErrorMessage} = useErrorToast()

    const createRoomModalContext = useCreateRoomModalContext()
    const {linkText, createRoom, title, setTitle} = useViewModel(setErrorMessage)

    function closeModal() {
        createRoomModalContext?.setVisibility(false)
    }

    return (<>
        <Transition appear show={createRoomModalContext?.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        <h1 className="font-bold text-lg">Ссылка в вашу комнату</h1>
                                        <button onClick={() => {
                                            createRoomModalContext?.setVisibility(false)
                                        }}
                                                className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                            <CloseModal />
                                        </button>
                                    </div>
                                    <h1> Скопируйте эту ссылку и поделитесь с теми, кого
                                        хотите пригласить. Сохраните ее, если планируете встречу позже.</h1>
                                    <div>
                                        <input
                                            className={inputStyle + " bg-transparent w-full w-full flex"}
                                            placeholder="Room title"
                                            value={title}
                                            onChange={(titleField) => {
                                                setTitle(titleField.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className={inputStyle + " w-full p-3 flex justify-between"}>
                                        <input className="bg-transparent w-full focus:outline-none"
                                               readOnly={true}
                                               value={linkText} />
                                        <div className="bg-transparent hover:bg-black border-transparent p-2 hover:rounded-full"
                                             onClick={() => navigator.clipboard.writeText(linkText)}>
                                            <CopyIcon />
                                        </div>
                                    </div>
                                    <button className={buttonTheme + " w-full"}
                                            onClick={createRoom}>Open
                                    </button>
                                    {message != null && <div className="text-red-600">{message}</div>}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}