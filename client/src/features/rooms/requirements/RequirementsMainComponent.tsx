import createRequirementImg from "../asserts/create_48px.png"
import useViewModel from "./RequirementsViewModel"
import {RequirementTabs} from "./RequirementTabs";
import {CreateRequirementsProps} from "../main/dialogs/createRequirement/CreateRequirementsDialog";
import {RequirementsMenu} from "./RequirementsMenu";
import {AppliedRequirementsList} from "./applied/AppliedRequirementsList";
import {NewRequirementsList} from "./new/NewRequirementsList";

export function RequirementsMainComponent({setIsVisibleState, isVisibleState}: CreateRequirementsProps) {
    const {menu, setMenu, roomReducer} = useViewModel()
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
        <RequirementTabs menu={menu} setMenu={setMenu}/>
        <div className="mt-2 border-2 border-[#29303A] p-4 space-y-4 h-fit rounded-lg overflow-y-scroll max-h-[calc(100vh-280px)]
            scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100
        ">
            {
                menu === RequirementsMenu.APPLIED && <AppliedRequirementsList
                    isVisibleState={isVisibleState}
                    setIsVisibleState={setIsVisibleState}
                />
            }
            {
                menu === RequirementsMenu.NEW && <NewRequirementsList
                    isVisibleState={isVisibleState}
                    setIsVisibleState={setIsVisibleState}
                />
            }
        </div>
    </div>
}