import {ProfileResponse} from "./ProfileResponse";

export interface AuthResponse {
    token: string
    user: ProfileResponse
}