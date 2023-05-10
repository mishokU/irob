

export interface AppState {
    inTestMode: boolean
    error : AppError
}

export interface AppError {
    message: string
    isVisible: boolean
}

export function initAppState(inTestMode: boolean): AppState {
    return {
        inTestMode: inTestMode,
        error: {
            message: "",
            isVisible: false
        }
    }
}