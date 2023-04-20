import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {buttonTheme} from "../../../themes/Themes";
import {FormPage} from "./FormPage";
import {ReactComponent as CloseModal} from "../../../ui/assets/close_black_24dp.svg";
import {UploadVideoContentComponent} from "./UploadVideoContentComponent";
import useViewModel from "./CreateLicenseViewModel"
import {useModalsContext} from "../../main/contexts/ModalsProvider";

export function CreateLicenseModal() {
    const {
        handleFileChange,
        state,
        clearVideo,
        onDescriptionChange,
        onCountryChange,
        onActorsChange,
        onResetClick,
        onNameChange,
        onCreateClick,
        onDirectorChange,
        onContentTypeChange
    } = useViewModel()
    const modalsContext = useModalsContext()
    return (<>
        <Transition appear show={modalsContext?.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                modalsContext?.setVisibility(false)
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
                    <div className="fixed inset-0 bg-black bg-opacity-30"/>
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
                                className=" transform overflow-hidden border-2 border-[#29303A] w-3/5 rounded-2xl bg-[#0E1420]
                                p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between">
                                    <h1 className="text-3xl font-bold">Content card creation</h1>
                                    <button onClick={() => {
                                        modalsContext?.setVisibility(false)
                                    }}
                                            className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                        <CloseModal/>
                                    </button>
                                </div>
                                <div className="flex mt-4 space-x-4">
                                    <FormPage
                                        state={state}
                                        onNameChange={onNameChange}
                                        onDescriptionChange={onDescriptionChange}
                                        onActorsChange={onActorsChange}
                                        onContentTypeChange={onContentTypeChange}
                                        onCountryChange={onCountryChange}
                                        onDirectorChange={onDirectorChange}
                                    />
                                    <UploadVideoContentComponent
                                        state={state}
                                        clearVideo={clearVideo}
                                        handleFileChange={handleFileChange}/>
                                </div>
                                <div className="flex justify-between space-x-2">
                                    <button className={buttonTheme + " mt-4 w-full"}
                                            onClick={() => onCreateClick()}>Create
                                    </button>
                                    <button className={buttonTheme + " mt-4 w-full"}
                                            onClick={() => onResetClick()}>Reset
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