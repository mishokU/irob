import {useUpdatePasswordMutation} from "../../../../data/store/profile/ProfileApi";
import {useState} from "react";
import {UpdatePasswordProps} from "./UpdatePasswordModal";
import {initNotification, usePopupContext} from "../../../main/contexts/NotificationProvider";


export default function UpdatePasswordViewModel(props: UpdatePasswordProps) {

    const [oldPassword, setOldPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")

    const [error, setError] = useState("")

    const popupContext = usePopupContext()

    const [updatePasswordMutation] = useUpdatePasswordMutation()

    const updatePasswordClick = async () => {
        async function updatePassword() {
            setError("")
            return await updatePasswordMutation({
                oldPassword: oldPassword,
                newPassword: props.newPassword,
                repeatNewPassword: repeatNewPassword
            }).unwrap()
        }

        updatePassword()
            .catch((error) => console.log(error))
            .then((data: any) => {
                if (data !== undefined) {
                    if(data.success){
                        props.setIsVisible(false)
                        popupContext?.setState(initNotification(data.message))
                    } else {
                        setError(data.message)
                    }
                }
            })

    }

    return {
        error,
        updatePasswordClick,
        oldPassword,
        setOldPassword,
        repeatNewPassword,
        setRepeatNewPassword
    }

}