import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {useCreateRoomModalContext} from "../../main/CreateRoomModalProvider";
import {ReactComponent as CloseModal} from "../asserts/close_black_24dp.svg";
import {ReactComponent as CopyIcon} from "../asserts/content_copy_black_24dp.svg";
import useViewModel from "./CreateRoomViewModel";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";

export function CreateRoomModal() {
    const createRoomModalContext = useCreateRoomModalContext()
    const {linkText} = useViewModel()
    const navigate = useNavigate()

    function closeModal() {
        createRoomModalContext?.setVisibility(false)
    }

    function getRoomLink() {
        const fullLink = linkText.split("/")
        return "/" + fullLink.at(fullLink.length - 1);
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
                            <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl  w-[400px]">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h1 className="font-bold text-lg">Ссылка в вашу комнату</h1>
                                        <button onClick={() => {
                                            createRoomModalContext?.setVisibility(false)
                                        }}
                                                className="bg-transparent hover:bg-gray-200 border-transparent p-2 rounded-none hover:rounded-full">
                                            <CloseModal />
                                        </button>
                                    </div>
                                    <h1 className="text-gray-600"> Скопируйте эту ссылку и поделитесь с теми, кого
                                        хотите пригласить. Сохраните ее, если планируете встречу позже.</h1>
                                    <div className="border-gray-100 bg-gray-100 rounded w-full p-3 flex justify-between">
                                        <input className="bg-transparent w-full"
                                               value={linkText} />
                                        <div className="bg-transparent hover:bg-gray-200 border-transparent p-2 hover:rounded-full"
                                             onClick={() => {
                                                 navigator.clipboard.writeText(linkText).then(r => {
                                                 })
                                             }}>
                                            <CopyIcon />
                                        </div>
                                    </div>
                                    <button className="p-2 border rounded-md bg-blue-400 text-white w-full"
                                            onClick={() => {
                                                createRoomModalContext?.setVisibility(false)
                                                navigate(IROBRoutes.rooms + getRoomLink(), {state: {path: linkText}})
                                            }}>Open
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}