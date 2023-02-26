import {RoomRequirementModel} from "../../../../domain/rooms/RoomRequirementModel";

export interface RequirementState {
    isVisible: boolean
    requirement: RoomRequirementModel | null
}