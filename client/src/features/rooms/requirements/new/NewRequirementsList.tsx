import useViewModel from "./NewRequirementsViewModel";
import {ReactComponent as DeleteRequirementsIcon} from "../../asserts/delete_request.svg";
import {ReactComponent as ApplyRequirementsIcon} from "../../asserts/check_request.svg";
import {CreateRequirementsProps} from "../../main/dialogs/createRequirement/CreateRequirementsDialog";

export function NewRequirementsList({setIsVisibleState}: CreateRequirementsProps) {
    const {
        newRequirements, onApplyRequirementClick, onDeclineRequirementClick, onRequirementClick, roomReducer
    } = useViewModel(setIsVisibleState)
    return <div>
        {newRequirements.length === 0 && <div className="text-white text-xl select-none">
            No requirements
        </div>}
        {newRequirements.length > 0 && newRequirements.map((requirement, index) => (<div
            key={index}
            className="relative p-2 h-max text-2xl rounded-lg text-white flex hover:bg-gray-800 p-2 cursor-pointer
                select-none justify-between items-center"
        >
            <div
                className={!roomReducer.isFinished ? "absolute w-3/5 h-full" : "absolute w-full h-full"}
                onClick={() => {
                    onRequirementClick(requirement)
                }}
            />
            <div>
                <h1 className="text-2xl max-w-[180px] overflow-hidden">{requirement.username}</h1>
                <h2 className="text-sm">{requirement.type}</h2>
            </div>
            {
                !roomReducer.isFinished && <div className="flex space-x-2">
                    {requirement.isApplyButtonVisible && <div
                        className="border rounded bg-green-600 hover:bg-green-500"
                        onClick={() => onApplyRequirementClick(requirement)}>
                        <ApplyRequirementsIcon/>
                    </div>}
                    <div
                        className="border rounded bg-red-600 hover:bg-red-500"
                        onClick={() => onDeclineRequirementClick(requirement.requirementId)}
                    >
                        <DeleteRequirementsIcon/>
                    </div>
                </div>
            }
        </div>))}
    </div>
}