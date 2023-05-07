export interface ContentFullCardState {

    isLoading: boolean

    isTrailerVisible: boolean
    isCreateRoomButtonVisible: boolean
    isDeleteDialogButtonVisible: boolean
    user: {
        username: string
        description: string
        avatar: string
        userId: number
    }

    content: {
        id: number
        name: string
        type: string
        duration: string
        year: string
        description: string
        genres: string
        startDate: string
        endDate: string
        category: string
        actors: string
        country: string
        videoPreview: string
        videoTrailerUrl: string
        startCost: string
        creationDate: string
        owner: string
    }

}

export function initContentFullCardState(): ContentFullCardState {
    return {
        isLoading: true,
        isCreateRoomButtonVisible: false,
        isDeleteDialogButtonVisible: false,
        isTrailerVisible: false,
        user: {
            username: "",
            description: "",
            avatar: "",
            userId: -1
        },
        content: {
            id: 0,
            name: "",
            type: "",
            duration: "",
            year: "",
            startDate: "",
            endDate: "",
            genres: "",
            description: "",
            actors: "",
            category: "",
            country: "",
            videoPreview: "",
            owner: "",
            videoTrailerUrl: "",
            startCost: "",
            creationDate: ""
        }
    }
}