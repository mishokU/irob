export interface CreateContentRequest {
    name: string
    description: string
    actors: string
    type: string
    category: string
    videoPreview: string
    country: string
    owner: string
    director: string
    videoUrl: string
    startDate: string
    trailerUrl: string | null
    endDate: string
    genres: string
    year: string
    cost : string
}