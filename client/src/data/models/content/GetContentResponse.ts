export interface GetContentResponse {
    success: boolean,
    message: string | null
    user: {
        username: string
        description: string
        email: string
        avatar: string
        userId: number
    }
    content: {
        id: string
        name: string
        description: string
        actors: string
        type: string
        category: string
        country: string
        startDate: string
        endDate: string
        cost: string
        genres: string
        year: string
        trailerUrl: string
        owner: string
        videoPreview: string
        date: string
    }
}