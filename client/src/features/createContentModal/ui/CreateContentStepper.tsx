import {Dispatch} from "react";
import {CheckIcon} from "./icons/CheckIcon"

export interface StepperProps {
    state: Stepper
}

export enum Stepper {
    INFO,
    ADDITIONAL,
    CONDITIONS
}

export function CreateContentStepper({state}: StepperProps) {
    const theme = `flex md:w-full items-center
             sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200
              after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`
    const activeTheme = theme + ` text-[#ffb81c]`
    const disableTheme = theme + ` text-white `
    return <div className="mt-4">
        <ol className="flex items-center w-full text-sm font-medium text-center text-white sm:text-base">
            <li className={state === Stepper.INFO ? activeTheme : disableTheme}>
                <span
                    className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                    {state !== Stepper.INFO && <span className="mr-2">1</span>}
                    {state === Stepper.INFO && <CheckIcon/>}
                    Start <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                </span>
            </li>
            <li className={state === Stepper.ADDITIONAL ? activeTheme : disableTheme}>
                <span
                    className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 min-w-fit">
                    {state !== Stepper.ADDITIONAL && <span className="mr-2">2</span>}
                    {state === Stepper.ADDITIONAL && <CheckIcon/>}
                    Additional <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                </span>
            </li>
            <li className={state === Stepper.CONDITIONS ? `text-[#ffb81c] flex items-center` : `text-white flex items-center`}>
                {state !== Stepper.CONDITIONS && <span className="mr-2">3</span>}
                {state === Stepper.CONDITIONS && <CheckIcon/>}
                Conditions
            </li>
        </ol>
    </div>
}