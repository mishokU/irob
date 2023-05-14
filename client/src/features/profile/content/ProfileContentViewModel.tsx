import {useEffect, useState} from "react";
import {CatalogueUi} from "../../catalogue/items/CatalogueUi";
import {GetShortContentResponse} from "../../../data/models/content/GetShortContentResponse";
import {useGetUserCatalogueItemsMutation} from "../../../data/store/content/ContentApi";
import {GetCatalogueItemsResponse} from "../../../data/models/content/GetCatalogueItemsResponse";

export default function ProfileContentViewModel() {

    const [content, setContent] = useState<CatalogueUi[]>([])

    const [isEmptyVisible, setIsEmptyVisible] = useState(false)
    const [getPagingUserContent] = useGetUserCatalogueItemsMutation()

    useEffect(() => {

        async function getCatalogue() {
            return await getPagingUserContent().unwrap()
        }

        getCatalogue().then((result: GetCatalogueItemsResponse) => {
            if (result.success) {
                const convertedUi = result.content.map((item: GetShortContentResponse) => {
                    return {
                        videoPreview: item.videoPreview,
                        contentId: item.contentId,
                        name: item.name
                    }
                })
                setContent(convertedUi)
                setIsEmptyVisible(result.content.length === 0)
            }
        }).catch((error) => console.log(error))

    }, [])

    return {
        content,
        isEmptyVisible
    }

}