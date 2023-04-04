import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {useNotificationContext} from "../main/contexts/NotificationModelProvider";

export function NotificationMainComponent() {
    const notificationContext = useNotificationContext()
    return <>
        <Transition appear show={notificationContext?.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => {
                notificationContext?.setVisibility(false)
            }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex p-4 justify-end mr-12 mt-12 text-center text-white">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className=" transform rounded-lg bg-gray-700
                                w-[320px] max-h-[450px] text-left pb-6 align-middle shadow-xl transition-all">
                                <div className="pt-4 pb-4 text-center">
                                    <h1>Notifications</h1>
                                </div>
                                <div className="w-full h-[2px] bg-black"/>
                                <div className="max-h-[350px] overflow-y-scroll">
                                    <div className="pl-4 pr-4 mt-2">
                                        <h1>Пользователь Миша Усов подтвердил со своей стороны сделку!</h1>
                                    </div>
                                    <div className="w-full h-[2px] bg-black"/>
                                    <div className="pl-4 pr-4 mt-2">
                                        <h1>Пользователь Миша Усов подтвердил со своей стороны сделку!</h1>
                                    </div>
                                    <div className="w-full h-[2px] bg-black"/>
                                    <div className="pl-4 pr-4 mt-2">
                                        <h1>Пользователь Миша Усов подтвердил со своей стороны сделку!</h1>
                                    </div>
                                    <div className="w-full h-[2px] bg-black"/>
                                    <div className="pl-4 pr-4 mt-2">
                                        <h1>Пользователь Миша Усов подтвердил со своей стороны сделку!</h1>
                                    </div>
                                    <div className="w-full h-[2px] bg-black"/>
                                    <div className="pl-4 pr-4 mt-2">
                                        <h1>Пользователь Миша Усов подтвердил со своей стороны сделку!</h1>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}