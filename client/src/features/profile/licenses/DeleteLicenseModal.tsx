import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { buttonTheme } from "../../../themes/Themes";
import { DeleteProps } from "./LicenseItemPage";
import { LicenseUiModel } from "./LicenseUiModel";
import { ReactComponent as CloseModal } from "../../../ui/assets/close_black_24dp.svg";

export interface CreateLicenseModalProps {
    props: DeleteProps
    setIsVisible: (props: DeleteProps) => void
    onDeleteClick: (license: LicenseUiModel | null) => Promise<void>
}

export function DeleteLicenseModal({ props, setIsVisible, onDeleteClick }: CreateLicenseModalProps) {
    return (<>
        <Transition appear show={props.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setIsVisible({
                    isVisible: false, license: null
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
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                                    <h1 className="text-3xl font-bold">Delete confirmation</h1>
                                    <button onClick={() => {
                                        setIsVisible({
                                            isVisible: false, license: null
                                        })
                                    }}
                                        className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                        <CloseModal />
                                    </button>
                                </div>
                                <div className="mt-4 space-y-6">
                                    <div>
                                        <h2 className="text-xl">Do you want to delete this license?</h2>
                                        <p className="text-gray-300">All your
                                            deposit will burn for you and will
                                            be returned to the other side of
                                            this deal! You should pay gas fee to canseledation this deal.
                                            This deletion delete license and another side can not load this content after next load.
                                        </p>
                                        <button className={buttonTheme + " mt-8 w-full"}
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