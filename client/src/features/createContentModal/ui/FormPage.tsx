import {ContentTypeDropDown} from "./ContentTypeDropDown";
import {inputStyle} from "../../../ui/themes/Themes";
import {CreateContentState} from "./CreateContentState";
import {useState} from "react";

export interface FormPageProps {
    state: CreateContentState
    onNameChange: (value: string) => void
    onCountryChange: (value: string) => void
    onDescriptionChange: (value: string) => void
    onContentTypeChange: (value: string) => void
    onDirectorChange: (value: string) => void
}

export function FormPage({
     state,
     onNameChange,
     onCountryChange,
     onDescriptionChange,
     onContentTypeChange,
     onDirectorChange
}: FormPageProps) {
    return <div className="lg:w-1/2 w-full lg:pr-0 pr-3">
        <h1 className="text-2xl font-bold">Filling out the form</h1>
        <div className="relative">
            <p className="mt-4">Content Type</p>
            <ContentTypeDropDown onContentTypeChange={onContentTypeChange}/>
        </div>
        <div>
            <div>
                <p className="mt-4">Content Name</p>
                <input
                    value={state.name}
                    onChange={(nameField) => onNameChange(nameField.target.value)}
                    className={inputStyle}/>
            </div>
            <div>
                <p className="mt-4">Description</p>
                <textarea
                    value={state.description}
                    onChange={(descriptionField) => onDescriptionChange(descriptionField.target.value)}
                    className="border-[#29303A] resize-none align-text-top border-2 rounded-lg
                     pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full h-[100px]"/>
            </div>
            <div>
                <p className="mt-4">Director</p>
                <input
                    value={state.director}
                    onChange={(nameField) => onDirectorChange(nameField.target.value)}
                    className={inputStyle}/>
            </div>
            <div>
                <p className="mt-4">Country</p>
                <input
                    value={state.country}
                    onChange={(nameField) => onCountryChange(nameField.target.value)}
                    className={inputStyle}/>
            </div>
        </div>
    </div>
}