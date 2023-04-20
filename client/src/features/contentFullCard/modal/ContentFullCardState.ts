export interface ContentFullCardState {

    user: {
        username: string
        description: string
        avatar: string
        userId: number
    }

    content: {
        name: string
        type: string
        duration: string
        year: string
        description: string
        category: string
        country: string
        videoPreview: string
        videoTrailerUrl: string
        startCost: string
        creationDate: string

    }

}

export function initContentFullCardState(): ContentFullCardState {
    return {
        user: {
            username: "",
            description: "",
            avatar: "",
            userId: -1
        },
        content: {
            name: "",
            type: "",
            duration: "",
            year: "",
            description: "",
            category: "",
            country: "",
            videoPreview: "",
            videoTrailerUrl: "",
            startCost: "",
            creationDate: ""
        }
    }
}