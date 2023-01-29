import {useState} from "react";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {useLoginMutation} from "../../../data/store/irob/IROBApi";
import {useAuthContext} from "../middleware/AuthProvider";
import {useNavigate} from "react-router-dom";
import validator from "email-validator";
import {minPasswordLength} from "../domain/utils/Auth";
import {AuthExceptionsConverter} from "../domain/errors/AuthExceptionsConverter";

export default function LoginViewModel(errorState: (value: string) => void) {

    const [email, setEmailState] = useState("")
    const [emailError, setEmailError] = useState<string | null>(null)

    const [password, setPasswordState] = useState("")
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const [login] = useLoginMutation()

    const authErrorConverter = new AuthExceptionsConverter()
    const authContext = useAuthContext()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            if (isEmailAndPasswordValid(email, password)) {
                const payload = await login({email, password}).unwrap()
                authContext?.setAuth({token: payload})
                navigate(IROBRoutes.catalogue)
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