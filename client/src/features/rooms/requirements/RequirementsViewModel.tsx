import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {RequirementMenuHandlerDelegate} from "./RequirementMenuHandlerDelegate";

export default function RequirementsViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)

    const {menu, setMenu} = RequirementMenuHandlerDelegate()

    return {
        menu,
        setMenu,
        roomReducer
    }

}