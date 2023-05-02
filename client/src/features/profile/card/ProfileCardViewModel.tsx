import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import { useState } from "react";
import avatarPlaceholder from "../../../ui/assets/avatart_placeholder.png"

export default function ProfileCardViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)

    const [avatar] = useState(getAvatar())

    function getAvatar(): string {
        if(profileReducer.avatar === ""){
            return avatarPlaceholder
        } else {
            return profileReducer.avatar
        }
    }

    return {
        profileReducer,
        avatar
    };

}
