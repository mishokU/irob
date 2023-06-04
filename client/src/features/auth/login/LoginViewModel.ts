import {useState} from "react";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {useLoginMutation} from "../../../data/store/auth/AuthApi";
import {useNavigate} from "react-router-dom";
import validator from "email-validator";
import {minPasswordLength} from "../domain/utils/Auth";
import {AuthExceptionsConverter} from "../domain/errors/AuthExceptionsConverter";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../../data/slices/ProfileSlice";
import AuthMiddleware from "../middleware/AuthMiddleware";
import {NotificationPosition, initNotification, usePopupContext} from "../../main/contexts/NotificationProvider";
import {useCookies} from "react-cookie";

export default function LoginViewModel(errorState: (value: string) => void) {

    const [email, setEmailState] = useState("")
    const [emailError, setEmailError] = useState<string | null>(null)

    const [password, setPasswordState] = useState("")
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const authMiddleware = AuthMiddleware()
    const [, setCookie, removeCookie] = useCookies(['token'])

    const [login] = useLoginMutation()

    const authErrorConverter = new AuthExceptionsConverter()

    const popupContext = usePopupContext()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async () => {
        try {
            if (isEmailAndPasswordValid(email, password)) {
                const payload = await login({email, password}).unwrap()
                authMiddleware.saveToken(payload.token)
                removeCookie('token')
                setCookie('token', payload.token)
                dispatch(updateProfile({
                    user: payload.user
                }))
                navigate(IROBRoutes.profile)
                popupContext?.setState(initNotification(payload.message, 3000, NotificationPosition.RIGHT_TOP))
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
        setEmail, setPassword, handleLogin, emailError, passwordError
    };

}