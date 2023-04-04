import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";

export default function ProfileCardViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile);

    return {
        profileReducer,
    };

}
