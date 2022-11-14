import {RegistrationUseCase} from "../domain/usecases/RegistrationUseCase";
import {useState} from "react";

export default function RegistrationViewModel() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function register() {
        return await RegistrationUseCase({email, password})
    }

    return {
        setEmail, setPassword, register
    };
}