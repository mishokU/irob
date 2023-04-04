import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {buttonTheme} from "../../../themes/Themes";
import {DeleteProps} from "./LicenseItemPage";

export interface CreateLicenseModalProps {
    props: DeleteProps
    setIsVisible: (props: DeleteProps) => void
    onDeleteClick: (licenseId: number) => Promise<void>
}

export function DeleteLicenseModal({
    props, setIsVisible
}: CreateLicenseModalProps) {
    return (<>
        <Transition appear show={props.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setIsVisible({
                    isVisible: false, licenseId: null
                })
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
                            <Dialog.Panel className=" transform max-w-xl overflow-hidden rounded-2xl bg-[#0E1420] p-6 text-left align-middle shadow-xl transition-all">
                                <h1 className="text-3xl font-bold">Deletion
                                    confirmation</h1>
                                <div className="mt-8 space-y-6">
                                    <div>
                                        <h2 className="text-xl">Do you want to
                                            suspend this license?</h2>
                                        <button className={buttonTheme + " mt-2 w-full"}
                                                onClick={() => {

                                                }}>Pause
                                        </button>
                                    </div>
                                    <div>
                                        <h2 className="text-xl">Do you want to
                                            delete this license?</h2>
                                        <p className="text-gray-300">All your
                                            deposit will burn for you and will
                                            be returned to the other side of
                                            this transaction!
                                        </p>
                                        <button className={buttonTheme + " mt-2 w-full"}
                                                onClick={() => {

                                                }}>Delete
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