import {useUpdatePasswordMutation} from "../../../../data/store/profile/ProfileApi";
import {useState} from "react";
import {UpdatePasswordProps} from "./UpdatePasswordModal";


export default function UpdatePasswordViewModel(props: UpdatePasswordProps) {

    const [oldPassword, setOldPassword] = useState("")
    const [repeatNewPassword, setRepeatNewPassword] = useState("")

    const [error, setError] = useState("")

    const [updatePasswordMutation] = useUpdatePasswordMutation()

    const updatePasswordClick = async () => {
        async function updatePassword() {
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

                    } else {
                        setError(data.message)
                    }
                }
            })

    }

    return {
        updatePasswordClick,
        oldPassword,
        setOldPassword,
        repeatNewPassword,
        setRepeatNewPassword
    }

}