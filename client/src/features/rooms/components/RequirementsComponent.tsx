import {ReactComponent as DeleteRequirementsIcon} from "../asserts/delete_request.svg";
import {ReactComponent as ApplyRequirementsIcon} from "../asserts/check_request.svg";

export function RequirementsComponent() {
    return <div className="w-[300px] min-w-[300px]">
        <div className="text-white text-2xl">Requirements</div>
        <div className="mt-4 border-2 p-4 space-y-4 h-fit rounded-md">
            <div className="border-2 p-4 h-max text-2xl rounded-md text-white flex justify-between items-center">
                <h1>Mikhail Usov </h1>
                <div className="flex space-x-2">
                    <div className="border rounded bg-red-600">
                        <DeleteRequirementsIcon/>
                    </div>
                    <div className="border rounded bg-green-600">
                        <ApplyRequirementsIcon/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}