export interface GetRequirementResponse {
    username: string
    requirementId: number
    userId: number
    isAlive: boolean
    success: boolean
    message: string | null
}