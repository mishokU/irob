import {GetShortContentResponse} from "./GetShortContentResponse";

export interface GetCatalogueItemsResponse {
    items: GetShortContentResponse[]
    offset: number
    message: string
    success: boolean
}