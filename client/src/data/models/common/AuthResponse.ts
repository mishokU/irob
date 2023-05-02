import {ProfileResponse} from "../profile/ProfileResponse";

export interface AuthResponse {
    token: string
    user: ProfileResponse
    message: string
}