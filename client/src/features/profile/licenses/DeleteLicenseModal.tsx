import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {buttonTheme} from "../../../ui/themes/Themes";
import {DeleteProps, initDeleteLicenseProps} from "./LicenseItemPage";
import {LicenseStatus, LicenseUiModel} from "./LicenseUiModel";
import {ReactComponent as CloseModal} from "../../../ui/assets/close_black_24dp.svg";

export interface CreateLicenseModalProps {
    props: DeleteProps
    setIsVisible: (props: DeleteProps) => void
    onDeleteClick: (license: LicenseUiModel | null) => Promise<void>
}

export function DeleteLicenseModal({props, setIsVisible, onDeleteClick}: CreateLicenseModalProps) {
    const description = props.license?.status === LicenseStatus.claimed ?
        "You can delete with license without any money, because already pass contract" :
        "All your deposit will burn for you and will" +
        "be returned to the other side of" +
        "this deal! You should pay gas fee to cancellation this deal." +
        "This deletion delete license and another side can not load this content" +
        "after next load."
    return (<>
        <Transition appear show={props.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsVisible(initDeleteLicenseProps(props.license))}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50"/>
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
                            <Dialog.Panel
                                className=" transform max-w-xl overflow-hidden rounded-2xl bg-[#0E1420] p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-3xl font-bold">Delete license confirmation</h1>
                                    <button
                                        onClick={() => setIsVisible(initDeleteLicenseProps(props.license))}
                                        className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                        <CloseModal/>
                                    </button>
                                </div>
                                <div className="mt-4 space-y-6">
                                    <div>
                                        <h2 className="text-xl">Do you want to delete this license?</h2>
                                        <p className="text-gray-300">{description}</p>
                                        <button
                                            className={buttonTheme + " mt-8 w-full"}
                                            onClick={() => onDeleteClick(props.license)}>Delete
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}