import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {ReactComponent as CloseModal} from "../../../ui/assets/close_black_24dp.svg";
import {buttonTheme, inputStyle} from "../../../ui/themes/Themes";
import {initAskQuestionProps, useAskQuestionContext} from "../../main/contexts/AskQuestionProvider";
import useViewModel from "./AsqQuestionViewModel"

export function AsqQuestionModal() {
    const askQuestion = useAskQuestionContext()
    const {
        email,
        setEmail,
        question,
        setQuestion,
        onSendClick
    } = useViewModel(askQuestion?.props.email ? askQuestion?.props.email : "")
    return <div>
        <Transition appear show={askQuestion?.props.isVisible} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => askQuestion?.setVisibility(initAskQuestionProps())}>
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
                                className=" transform w-[600px] overflow-hidden rounded-2xl bg-[#0E1420] p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold">Asq question</h1>
                                    <button
                                        onClick={() => askQuestion?.setVisibility(initAskQuestionProps())}
                                        className="bg-transparent hover:bg-black border-transparent p-2 rounded-none hover:rounded-full">
                                        <CloseModal/>
                                    </button>
                                </div>
                                <div className="mt-4 space-y-6">
                                    <div>
                                        <p className="mt-4">Email</p>
                                        <input
                                            value={email}
                                            autoFocus={true}
                                            placeholder={"your@email.com"}
                                            onChange={(nameField) => setEmail(nameField.target.value)}
                                            className={inputStyle}/>
                                    </div>
                                    <div>
                                        <p className="mt-4">Question</p>
                                        <textarea
                                            value={question}
                                            placeholder="Why i need this service?"
                                            onChange={(questionField) => setQuestion(questionField.target.value)}
                                            className="border-[#29303A] focus:outline-none outline-none focus:ring-0 focus:border-[#29303A] align-text-top border-2 rounded-lg pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full h-[200px]"/>
                                    </div>
                                    <button
                                        className={buttonTheme + " mt-8 w-full"}
                                        onClick={onSendClick}>Send question
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </div>
}