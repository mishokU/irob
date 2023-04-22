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
        name: "John Wick",
        description: "With the untimely death of his beloved wife still bitter in his mouth," +
            " John Wick, the expert former assassin, receives one final gift from her a precious keepsake" +
            " to help John find a new meaning in life now that she is gone. But when the arrogant Russian mob prince, Iosef Tarasov, and " +
            "his men pay Wick a rather unwelcome visit to rob him of his prized 1969 Mustang and his wifes present, the...",
        genres: "Action, Crime, Thriller / Suspense",
        owner: "Summit Entertainment",
        cost: "0.004",
        duration: "2hr41m",
        year: "2014",
        startDate: "03.12.1999",
        endDate: "03.12.1999",
        isLoading: false,
        category: "",
        director: "David Leitch, Chad Stahelski",
        actors: "Michael Nyqvist, Keanu Reeves, Alfie Allen",
        country: "China, United States",
        video: null,
        trailer: null
    }
}