import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";


export default function AccountManagementViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)


    return {
        profileReducer
    }

}