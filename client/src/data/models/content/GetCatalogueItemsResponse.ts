import {GetShortContentResponse} from "./GetShortContentResponse";

export interface GetCatalogueItemsResponse {
    content: GetShortContentResponse[]
    offset: number
    message: string
    success: boolean
}