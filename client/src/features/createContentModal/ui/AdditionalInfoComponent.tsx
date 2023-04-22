import {inputStyle} from "../../../themes/Themes";
import {CreateContentState} from "./CreateContentState";


export interface AdditionalInfoProps {
    state: CreateContentState
    onGenresChanged: (value: string) => void
    onYearChanged: (value: string) => void
    onOwnerChanged: (value: string) => void
    onCastChanged: (value: string) => void
}

export function AdditionalInfoComponent({
        state,
        onGenresChanged,
        onCastChanged,
        onOwnerChanged,
        onYearChanged
}: AdditionalInfoProps) {
    return <div className="w-3/5 items-center">
        <h1>Additional content information</h1>
        <p>There are some unnecessary fields that you can field</p>
        <div>
            <p className="mt-4">Genres</p>
            <input
                value={state.genres}
                onChange={(nameField) => {
                    onGenresChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
        <div>
            <p className="mt-4">Content creation year</p>
            <input
                value={state.year}
                onChange={(nameField) => {
                    onYearChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
        <div>
            <p className="mt-4">Cast</p>
            <input
                value={state.actors}
                onChange={(nameField) => {
                    onCastChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
        <div>
            <p className="mt-4">Studio owner</p>
            <input
                value={state.owner}
                onChange={(nameField) => {
                    onOwnerChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
    </div>
}