import {inputStyle} from "../../../ui/themes/Themes";
import {CreateContentState} from "./CreateContentState";

export interface ConditionalsProps {
    state: CreateContentState
    onCostChanged: (value: string) => void
    onDistributionStartDateChanged: (value: string) => void
    onDistributionEndDateChanged: (value: string) => void
}

export function StartConditionsComponent({
     state,
     onCostChanged,
     onDistributionStartDateChanged,
     onDistributionEndDateChanged
}: ConditionalsProps) {
    return <div className="mt-12">
        <h1>Start conditions information</h1>
        <p>There are some unnecessary fields that you can field</p>
        <div>
            <p className="mt-4">Start cost (in ETH)</p>
            <input
                value={state.cost}
                placeholder="0.004"
                onChange={(nameField) => {
                    onCostChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
        <div>
            <p className="mt-4">Start date</p>
            <input
                value={state.startDate}
                placeholder="03.12.1999"
                onChange={(nameField) => {
                    onDistributionStartDateChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
        <div>
            <p className="mt-4">End date</p>
            <input
                value={state.endDate}
                placeholder="03.12.2001"
                onChange={(nameField) => {
                    onDistributionEndDateChanged(nameField.target.value)
                }}
                className={inputStyle}/>
        </div>
    </div>
}