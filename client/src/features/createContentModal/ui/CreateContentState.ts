export interface CreateContentState {
    contentType: string
    name: string
    description: string
    director: string
    country: string
    owner: string
    category: string
    actors: string
    video: {
        url: string
        name: string
        file: File,
    } | null
}

export function initCreateContentState(): CreateContentState {
    return {
        contentType: "",
        name: "",
        description: "",
        owner: "",
        category: "",
        director: "",
        actors: "",
        country: "",
        video: null
    }
}