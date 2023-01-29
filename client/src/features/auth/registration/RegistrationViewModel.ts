import {useState} from "react";
import {useRegistrationMutation} from "../../../data/store/irob/IROBApi";
import {useAuthContext} from "../middleware/AuthProvider";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {minPasswordLength} from "../domain/utils/Auth";
import {AuthExceptionsConverter} from "../domain/errors/AuthExceptionsConverter";

const validator = require("email-validator");

export default function RegistrationViewModel(errorState: (value: string) => void) {

    const authErrorConverter = new AuthExceptionsConverter()

    const [email, setEmailState] = useState("")
    const [emailError, setEmailError] = useState<string | null>(null)

    const [password, setPasswordState] = useState("")
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const [registration] = useRegistrationMutation()

    const authContext = useAuthContext()
    const navigate = useNavigate()

    const handleRegistration = async () => {
        try {
            if (isEmailAndPasswordValid(email, password)) {
                const payload = await registration({email, password}).unwrap()
                authContext?.setAuth({token: payload})
                navigate(IROBRoutes.profile)
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