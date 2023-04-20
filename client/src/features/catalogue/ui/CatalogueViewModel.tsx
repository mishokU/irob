import {useEffect, useState} from "react";
import {CatalogueUi} from "../items/CatalogueUi";
import {useGetCatalogueItemsMutation} from "../../../data/store/content/ContentApi";
import {GetShortContentResponse} from "../../../data/models/content/GetShortContentResponse";

export default function CatalogueViewModel() {

    const [error, setError] = useState("");
    const [content, setContent] = useState<CatalogueUi[]>([]);

    const [getPagingContents] = useGetCatalogueItemsMutation()

    useEffect(() => {

        async function getCatalogue() {
            return await getPagingContents().unwrap()
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
                }
            })

    }, [])

    return {
        error,
        content
    }
}