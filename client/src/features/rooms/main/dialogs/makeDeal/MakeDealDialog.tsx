import {MakeDealDialogProps} from "./MakeDealDialogProps";
import {Dialog, Transition} from "@headlessui/react";
import {ReactComponent as CloseModal} from "../../../../../ui/assets/close_black_24dp.svg";
import useViewModel from "./MakeDealViewModel"
import {Fragment} from "react";
import {LeftButtonComponent} from "./leftButton/LeftButtonComponent";
import {RightButtonComponent} from "./rightButton/RightButtonComponent";

export function MakeDealDialog({isVisible, setIsVisible}: MakeDealDialogProps) {
    const {applyRequirementsCount, fullApplyRequirementsCount} = useViewModel()
    return <div>
        <Transition appear show={isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsVisible(false)}>
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
                            bg-[#0E1420] p-6 text-left align-middle shadow-xl w-[700px] transition-all">
                                <div className="space-y-3 text-white">
                                    <div className="flex items-center justify-between">
                                        <h1 className="font-bold text-2xl">Deal confirmation dialog</h1>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                            <CloseModal/>
                                        </button>
                                    </div>
                                    <h1> In this dialog box, you can monitor the readiness of your transaction, all your
                                        conditions will be recorded on our servers,
                                        upon conclusion, you will
                                        have a record in your personal account on both sides, and you will also have
                                        access to the tab with payment for this room</h1>
                                    <h2>Necessarily requirements
                                        count {applyRequirementsCount} / {fullApplyRequirementsCount}</h2>
                                    {
                                        applyRequirementsCount < fullApplyRequirementsCount && <div>
                                            <p className="text-red-600">You must get all of the required requirements such
                                                as: Cost, Hold deposit, Duration days</p>
                                        </div>
                                    }
                                    {
                                        fullApplyRequirementsCount !== 0 && <div className="flex">
                                            <LeftButtonComponent
                                                applyRequirementsCount={applyRequirementsCount}
                                                fullApplyRequirementsCount={fullApplyRequirementsCount}/>
                                            <div className="h-full w-1 bg-black"/>
                                            <RightButtonComponent
                                                applyRequirementsCount={applyRequirementsCount}
                                                fullApplyRequirementsCount={fullApplyRequirementsCount}/>
                                        </div>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
}