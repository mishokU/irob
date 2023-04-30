import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";


export default function SettingsViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile);



    return {

        profileReducer

    }

}