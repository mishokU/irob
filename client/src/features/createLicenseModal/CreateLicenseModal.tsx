import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {buttonTheme} from "../../themes/Themes";
import CreateLicenseStepper from "./CreateLicenseStepper";
import {FormPage} from "./FormPage";

export interface CreateLicenseModalProps {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
}

export function CreateLicenseModal({isVisible, setIsVisible}: CreateLicenseModalProps) {
    return (<>
        <Transition appear show={isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                setIsVisible(false)
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
                            <Dialog.Panel className=" transform overflow-hidden rounded-2xl bg-[#0E1420] p-6 text-left align-middle shadow-xl transition-all">
                                <h1 className="text-3xl font-bold">Создание вашей лицензии</h1>
                                <FormPage/>
                                <div className="flex justify-between space-x-2">
                                    <button className={buttonTheme + " mt-4 w-full"} onClick={() => {

                                    }}>Save</button>
                                    <button className={buttonTheme + " mt-4 w-full"} onClick={() => {

                                    }}>Reset</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>)
}