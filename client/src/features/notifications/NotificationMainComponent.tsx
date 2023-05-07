import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {useNotificationContext} from "../main/contexts/NotificationModelProvider";
import closeBack from "../../ui/assets/close_black_24dp.svg"
import useViewModel from "./NotificationMainViewModel"
import {NotificationItemComponent} from "./NotificationItemComponent";

export function NotificationMainComponent() {
    const notificationContext = useNotificationContext()
    const {notifications, isEmptyVisible, onNotificationClick} = useViewModel()
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
                    <div className="fixed inset-0"/>
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex p-4 justify-end mr-28 mt-16 text-center text-white">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className=" transform rounded-lg bg-[#0E1420] border-2 border-[#29303A]
                                w-[340px] max-h-[450px] text-left pb-2 align-middle shadow-xl transition-all">
                                <div className="pt-2 pb-4 text-center text-lg font-bold relative">
                                    <h1 className="pt-2 select-none">Notifications</h1>
                                    <img
                                        onClick={() => notificationContext?.setVisibility(false)}
                                        className="absolute w-10 h-10 right-3 top-2.5 bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full"
                                        src={closeBack}/>
                                </div>
                                <div className="w-full h-[2px] bg-[#29303A]"/>
                                <div className="max-h-[350px] overflow-y-scroll">
                                    {notifications?.length !== 0 && notifications.map((item, index) =>
                                        <NotificationItemComponent
                                            notification={item}
                                            onNotificationClick={onNotificationClick}
                                            isDividerVisible={index + 1 !== notifications.length}/>)}
                                    {isEmptyVisible && <div className="p-4 text-center">
                                        <h1>There are no notifications for you!</h1>
                                    </div>}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}