import {getWholeCatalogue} from "../datasources/CatalogueDataSource";


export async function getCatalogue() {
    const { result, error } = await getWholeCatalogue()
    return { result, error }
}