

export interface AppState {
    error : AppError
}

export interface AppError {
    message: string
    isVisible: boolean
}

export function initAppState(): AppState {
    return {
        error: {
            message: "",
            isVisible: false
        }
    }
}