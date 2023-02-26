import {Dispatch, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CreateRequirementFormPage} from "./CreateRequirementFormPage";
import {RequirementState} from "../../page/RequirementState";

export interface CreateRequirementsProps {
    isVisibleState: RequirementState
    setIsVisibleState: Dispatch<RequirementState>
}

export function CreateRequirementsDialog({isVisibleState, setIsVisibleState}: CreateRequirementsProps) {
    return <div>
        <Transition appear show={isVisibleState.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setIsVisibleState({isVisible: false, requirement: null})
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
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center text-white">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="border-2 border-[#29303A] transform overflow-hidden rounded-2xl
                            bg-[#0E1420] p-6 w-[800px] text-left align-middle shadow-xl transition-all">
                                <CreateRequirementFormPage
                                    isVisibleState={isVisibleState}
                                    setIsVisibleState={setIsVisibleState}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
}