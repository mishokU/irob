import {useEffect, useState} from "react";
import {CatalogueUi} from "../../catalogue/items/CatalogueUi";
import {GetShortContentResponse} from "../../../data/models/content/GetShortContentResponse";
import {useGetUserCatalogueItemsMutation} from "../../../data/store/content/ContentApi";

export default function ProfileContentViewModel() {

    const [content, setContent] = useState<CatalogueUi[]>([])

    const [isEmptyVisible, setIsEmptyVisible] = useState(false)
    const [getPagingUserContent] = useGetUserCatalogueItemsMutation()

    useEffect(() => {

        async function getCatalogue() {
            return await getPagingUserContent().unwrap()
        }

        getCatalogue()
            .catch((error) => console.log(error))
            .then((result: any) => {
                if (result.success) {
                    const convertedUi = result.content.map((item: GetShortContentResponse) => {
                        console.log(item)
                        return {
                            videoPreview: item.videoPreview,
                            contentId: item.contentId,
                            name: item.name
                        }
                    })
                    setContent(convertedUi)
                    setIsEmptyVisible(result.content.length === 0)
                }
            })

    }, [])

    return {
        content,
        isEmptyVisible
    }

}