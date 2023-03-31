import {ReactComponent as DeleteRequirementsIcon} from "../asserts/delete_request.svg";
import {ReactComponent as ApplyRequirementsIcon} from "../asserts/check_request.svg";
import createRequirementImg from "../asserts/create_48px.png"
import useViewModel from "./RequirementsViewModel"
import {RequirementTabs} from "./RequirementTabs";
import {CreateRequirementsProps} from "../main/dialogs/createRequirement/CreateRequirementsDialog";

export function RequirementsMainComponent({setIsVisibleState}: CreateRequirementsProps) {
    const {
        requirements, onApplyRequirementClick, onDeclineRequirementClick, menu, onRequirementClick, setMenu, roomReducer
    } = useViewModel(setIsVisibleState)
    return <div className={!roomReducer.isFinished ? "w-[300px] min-w-[300px] -mt-2" : "w-[300px] min-w-[300px]"}>
        <div className="flex justify-between items-end">
            <div className="text-white text-2xl">Requirements</div>
            <div className={roomReducer.isFinished ? "pointer-events-none cursor-none select-none" : "cursor-pointer"}
                 onClick={() => {
                     setIsVisibleState({
                         isVisible: true, requirement: null
                     })
                 }}>
                {!roomReducer.isFinished && <img alt="photo" className="w-10 h-10" src={createRequirementImg}/>}
            </div>
        </div>
        <RequirementTabs menu={menu} setMenu={setMenu} />
        <div className="mt-2 border-2 border-[#29303A] p-4 space-y-4 h-fit rounded-lg overflow-y-scroll max-h-[calc(100vh-280px)]
            scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100
        ">
            {requirements.length === 0 && <div className="text-white text-xl select-none">
                No requirements
            </div>}
            {requirements.length > 0 && requirements.map((requirement, index) => (<div
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
                    <h1 className="text-2xl">{requirement.username}</h1>
                    <h2 className="text-sm">{requirement.type}</h2>
                </div>
                {
                    !roomReducer.isFinished && <div className="flex space-x-2">
                        {requirement.isApplyButtonVisible && <div
                            className="border rounded bg-green-600 hover:bg-green-500"
                            onClick={() => onApplyRequirementClick(requirement.requirementId)}>
                            <ApplyRequirementsIcon />
                        </div>}
                        <div
                            className="border rounded bg-red-600 hover:bg-red-500"
                            onClick={() => onDeclineRequirementClick(requirement.requirementId)}
                        >
                            <DeleteRequirementsIcon />
                        </div>
                    </div>
                }
            </div>))}
        </div>
    </div>
}