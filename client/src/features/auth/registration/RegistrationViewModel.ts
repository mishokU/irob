import {useState} from "react";
import {useRegistrationMutation} from "../../../data/store/auth/AuthApi";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {minPasswordLength} from "../domain/utils/Auth";
import {AuthExceptionsConverter} from "../domain/errors/AuthExceptionsConverter";
import AuthMiddleware from "../middleware/AuthMiddleware";
import {updateProfile} from "../../../data/slices/ProfileSlice";
import {useDispatch} from "react-redux";
import { initNotification, usePopupContext } from "../../main/contexts/NotificationProvider";
import {useCookies} from "react-cookie";

const validator = require("email-validator");

export default function RegistrationViewModel(errorState: (value: string) => void) {

    const authErrorConverter = new AuthExceptionsConverter()

    const [email, setEmailState] = useState("")
    const [emailError, setEmailError] = useState<string | null>(null)

    const [password, setPasswordState] = useState("")
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const [registration] = useRegistrationMutation()

    const [, setCookie] = useCookies(['token'])

    const popupContext = usePopupContext()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegistration = async () => {
        try {
            if (isEmailAndPasswordValid(email, password)) {
                const payload = await registration({
                    email: email,
                    password: password
                }).unwrap()
                setCookie('token', payload.token)
                dispatch(updateProfile({user: payload.user}))
                navigate(IROBRoutes.profile)
                popupContext?.setState(initNotification(payload.message))
            }
        } catch (exception: any) {
            errorState(authErrorConverter.convert(exception))
        }
    }

    function setEmail(email: string) {
        setEmailState(email)
        setEmailError(null)
    }

    function setPassword(password: string) {
        setPasswordState(password)
        setPasswordError(null)
    }

    function isEmailAndPasswordValid(email: string, password: string): boolean {
        let isErrorNotFound = true
        if (email.length === 0) {
            setEmailError("Empty email")
            isErrorNotFound = false
        }
        if (!validator.validate(email)) {
            setEmailError("Email is not valid")
            isErrorNotFound = false
        }
        if (password.length <= minPasswordLength) {
            setPasswordError("Min 6 symbols password")
            isErrorNotFound = false
        }
        return isErrorNotFound
    }

    return {
        setEmail, setPassword, emailError, passwordError, handleRegistration
    };

}