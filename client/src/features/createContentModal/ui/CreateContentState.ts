export interface CreateContentState {
    contentType: string
    name: string
    description: string
    director: string
    country: string
    year: string
    cost: string
    startDate: string
    endDate: string
    genres: string
    owner: string
    category: string
    actors: string
    duration: string
    isLoading: boolean
    video: Media | null
    trailer: Media | null
}

export interface Media {
    url: string
    name: string
    file: File,
}

export function initCreateContentState(): CreateContentState {
    return {
        contentType: "Film",
        name: "",
        description: "",
        genres: "",
        owner: "",
        cost: "",
        duration: "",
        year: "",
        startDate: "",
        endDate: "",
        isLoading: false,
        category: "",
        director: "",
        actors: "",
        country: "",
        video: null,
        trailer: null
    }
}