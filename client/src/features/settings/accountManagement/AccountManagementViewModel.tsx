import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {useDeleteAccountMutation, useDisableAccountMutation} from "../../../data/store/profile/ProfileApi";
import {useState} from "react";
import {clearProfile, updateIsDisabled} from "../../../data/slices/ProfileSlice";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";
import { NotificationPosition, initNotification, usePopupContext } from "../../main/contexts/NotificationProvider";


export default function AccountManagementViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)

    const [disableButtonText, setDisableButtonText] = useState(getText(profileReducer.disabled))

    const [isUpdatePasswordVisible, setIsUpdatePasswordVisible] = useState(false)
    const [newPassword, setNewPassword] = useState("")

    const popupContext = usePopupContext()

    const [deleteAccountMutation] = useDeleteAccountMutation()
    const [disableAccountMutation] = useDisableAccountMutation()

    const authMiddleware = AuthMiddleware()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteAccountClick = async () => {

        async function deleteAccount() {
            return await deleteAccountMutation().unwrap()
        }

        deleteAccount()
            .catch((error) => console.log(error))
            .then((data: any) => {
                if (data !== undefined) {
                    dispatch(clearProfile())
                    authMiddleware.removeToken()
                    navigate(IROBRoutes.home)
                    popupContext?.setState(initNotification(data.message))
                }
            })
    }

    const disableAccountClick = async () => {
        async function disableAccount() {
            return await disableAccountMutation().unwrap()
        }

        disableAccount()
            .catch((error) => console.log(error))
            .then((data: any) => {
                if (data !== undefined) {
                    setDisableButtonText(getText(data.isDisabled))
                    dispatch(updateIsDisabled(data.isDisabled))
                    popupContext?.setState(initNotification(data.message))
                }
            })

    }

    function getText(isDisabled: boolean): string {
        if (isDisabled) {
            return "Activate"
        } else {
            return "Disable"
        }
    }

    return {
        profileReducer,
        deleteAccountClick,
        disableButtonText,
        isUpdatePasswordVisible,
        setIsUpdatePasswordVisible,
        newPassword,
        setNewPassword,
        disableAccountClick
    }

}