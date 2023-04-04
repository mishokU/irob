import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from "react";
import {ProfileInfoComponent} from "./components/ProfileInfoComponent";
import {CardInfoComponent} from "./components/CardInfoComponent";
import {useModalsContext} from "../main/contexts/ModalsProvider";

export function LicenseFullCardComponent() {
    const modalContext = useModalsContext()

    function closeModal() {
        modalContext?.setVisibility(false)
    }

    return (<>
        <Transition appear show={modalContext?.isVisible} as={Fragment}>
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
                            <Dialog.Panel className=" transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex space-x-4">
                                    <ProfileInfoComponent/>
                                    <CardInfoComponent />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}