export interface GetContentResponse {
    user: {
        username: string
        description: string
        avatar: string
        userId: number
    }
    content: {
        name: string
        description: string
        actors: string
        type: string
        category: string
        country: string
        owner: string
        videoPreview: string
        userId: number
        username: string
        email: string
        date: string
    }
}