import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {buttonTheme} from "../../../ui/themes/Themes";
import {ReactComponent as CloseModal} from "../../../ui/assets/close_black_24dp.svg";
import useViewModel from "./CreateLicenseViewModel"
import {initCreateCardProps, useModalsContext} from "../../main/contexts/ModalsProvider";
import {CreateContentStepper, Stepper} from "./CreateContentStepper";
import {FormPage} from "./FormPage";
import {UploadVideoContentComponent} from "./UploadVideoContentComponent";
import {AdditionalInfoComponent} from "./AdditionalInfoComponent";
import {StartConditionsComponent} from "./StartConditionsComponent";
import {IROBProgressBar} from "../../../ui/common/IROBProgressBar";

export interface CreateLicenseProps {
    roomId: string | null
}

export function CreateLicenseModal({roomId}: CreateLicenseProps) {
    const {
        handleFileChange,
        state,
        clearVideo,
        clearTrailer,
        handleTrailerChanged,
        onDescriptionChange,
        onCostChanged,
        onDistributionStartDateChanged,
        onDistributionEndDateChanged,
        onCountryChange,
        onActorsChange,
        onRightButtonClick,
        onNameChange,
        onOwnerChanged,
        onLeftButtonClick,
        onDirectorChange,
        onGenresChanged,
        onYearChanged,
        onContentTypeChange,
        leftButtonText,
        rightButtonText,
        stepper
    } = useViewModel(roomId)
    const modalsContext = useModalsContext()
    return (<>
        <Transition appear show={modalsContext?.state.isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {
                modalsContext?.setState(initCreateCardProps())
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
                                className=" transform overflow-hidden border-2 border-[#29303A] w-3/5 rounded-2xl bg-[#0E1420] text-left align-middle shadow-xl transition-all">
                                {state.isLoading && <IROBProgressBar/>}
                                {state.isLoading && <div className="absolute z-20 w-full h-full bg-black opacity-70"/>}
                                <div className="p-6">
                                    <div className="flex justify-between">
                                        <h1 className="text-3xl font-bold">Content card creation</h1>
                                        <button onClick={() => {
                                            modalsContext?.setState(initCreateCardProps())
                                        }}
                                                className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                            <CloseModal/>
                                        </button>
                                    </div>
                                    <CreateContentStepper state={stepper}/>
                                    <div className="mt-4 h-[550px]">
                                        {
                                            stepper === Stepper.INFO && <div className="flex space-x-4">
                                                <FormPage
                                                    state={state}
                                                    onNameChange={onNameChange}
                                                    onDescriptionChange={onDescriptionChange}
                                                    onContentTypeChange={onContentTypeChange}
                                                    onCountryChange={onCountryChange}
                                                    onDirectorChange={onDirectorChange}
                                                />
                                                <UploadVideoContentComponent
                                                    media={state.video}
                                                    clearVideo={clearVideo}
                                                    isTrailer={false}
                                                    handleFileChange={handleFileChange}/>
                                            </div>
                                        }
                                        {
                                            stepper === Stepper.ADDITIONAL && <div className="flex space-x-4">
                                                <AdditionalInfoComponent
                                                    onCastChanged={onActorsChange}
                                                    onGenresChanged={onGenresChanged}
                                                    onYearChanged={onYearChanged}
                                                    onOwnerChanged={onOwnerChanged}
                                                    state={state}
                                                />
                                                <UploadVideoContentComponent
                                                    media={state.trailer}
                                                    clearVideo={clearTrailer}
                                                    isTrailer={true}
                                                    handleFileChange={handleTrailerChanged}/>
                                            </div>
                                        }
                                        {
                                            stepper === Stepper.CONDITIONS &&
                                            <div className="flex justify-center items-center">
                                                <StartConditionsComponent
                                                    state={state}
                                                    onCostChanged={onCostChanged}
                                                    onDistributionEndDateChanged={onDistributionEndDateChanged}
                                                    onDistributionStartDateChanged={onDistributionStartDateChanged}
                                                />
                                            </div>
                                        }
                                    </div>
                                    <div className="flex justify-between space-x-2">
                                        <button className={buttonTheme + " mt-4 w-full"}
                                                onClick={() => onLeftButtonClick()}>{leftButtonText}
                                        </button>
                                        <button className={buttonTheme + " mt-4 w-full"}
                                                onClick={() => onRightButtonClick()}>{rightButtonText}
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