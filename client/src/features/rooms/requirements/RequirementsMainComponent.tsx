import {ReactComponent as DeleteRequirementsIcon} from "../asserts/delete_request.svg";
import {ReactComponent as ApplyRequirementsIcon} from "../asserts/check_request.svg";
import createRequirementImg from "../asserts/create_48px.png"
import useViewModel from "./RequirementsViewModel"
import {RequirementTabs} from "./RequirementTabs";
import {Dispatch} from "react";

export interface RequirementsMainProps {
    isVisible: boolean,
    setIsVisible: Dispatch<boolean>
}

export function RequirementsMainComponent({isVisible, setIsVisible}: RequirementsMainProps) {
    const {requirements, onRequirementClick, onApplyRequirementClick, onDeclineRequirementClick, menu, setMenu} = useViewModel()
    return <div className="w-[300px] min-w-[300px] -mt-2">
        <div className="flex justify-between items-end">
            <div className="text-white text-2xl">Requirements</div>
            <div className="cursor-pointer" onClick={() => {
                setIsVisible(!isVisible)
            }}>
                <img className="w-10 h-10" src={createRequirementImg} />
            </div>
        </div>
        <RequirementTabs menu={menu} setMenu={setMenu} />
        <div className="mt-2 border-2 border-[#29303A] p-4 space-y-4 h-fit rounded-lg overflow-y-scroll max-h-[700px]
            scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100
        ">
            {requirements.length === 0 && <div className="text-white text-xl select-none">
                No requirements
            </div>}
            {requirements.map((requirement) => (<div
                key={requirement.requirementId}
                className="p-2 h-max text-2xl rounded-lg text-white flex hover:bg-gray-800 p-2 cursor-pointer
                select-none justify-between items-center"
                onClick={onRequirementClick}
            >
                <h1>{requirement.username}</h1>
                <div className="flex space-x-2">
                    {requirement.isApplyButtonVisible && <div
                        className="border rounded bg-green-600 hover:bg-green-500"
                        onClick={() => {
                            onApplyRequirementClick(requirement.requirementId)
                        }}>
                        <ApplyRequirementsIcon />
                    </div>}
                    <div
                        className="border rounded bg-red-600 hover:bg-red-500"
                        onClick={() => {
                            onDeclineRequirementClick(requirement.requirementId)
                        }}
                    >
                        <DeleteRequirementsIcon />
                    </div>
                </div>
            </div>))}
        </div>
    </div>
}