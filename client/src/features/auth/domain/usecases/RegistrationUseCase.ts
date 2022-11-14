import {RegistrationRequest} from "../models/RegistrationRequest";
import {useRegistrationQuery} from "../../../../data/store/irob/IROBApi";

export async function RegistrationUseCase(request: RegistrationRequest) {
    return useRegistrationQuery(request)
}