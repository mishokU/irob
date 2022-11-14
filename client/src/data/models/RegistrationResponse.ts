import {UserResponse} from "./UserResponse";

export interface RegistrationResponse {
    status: number
    data: UserResponse
    message: string
}