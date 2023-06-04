import {useEffect, useState} from "react";
import {CatalogueUi} from "../items/CatalogueUi";
import {useGetCatalogueItemsMutation} from "../../../data/store/content/ContentApi";
import {GetShortContentResponse} from "../../../data/models/content/GetShortContentResponse";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {updateCatalogueItems, updateCatalogueState} from "../redux/CatalogueSlice";

export default function CatalogueViewModel() {

    const [error, setError] = useState("");
    const [isEmptyVisible, setIsEmptyVisible] = useState(false)
    const [content, setContent] = useState<CatalogueUi[]>([]);

    const catalogueReducer = useSelector((state: RootState) => state.catalogueSlice)
    const dispatch = useDispatch()

    const [getPagingContents] = useGetCatalogueItemsMutation()

    useEffect(() => {
        loadCatalogue().then(r => {})
    }, [])

    useEffect(() => {
        if(catalogueReducer.reloadCatalogue){
            loadCatalogue().then(r => {})
            dispatch(updateCatalogueState({reload: false}))
        }
    }, [catalogueReducer.reloadCatalogue])

    async function getCatalogue() {
        return await getPagingContents().unwrap()
    }

    async function loadCatalogue() {
        getCatalogue()
            .catch((error) => console.log(error))
            .then((result: any) => {
                if (result.success) {
                    const convertedUi = result.content.map((item: GetShortContentResponse) => {
                        return {
                            videoPreview: item.videoPreview,
                            contentId: item.contentId,
                            name: item.name
                        }
                    })
                    setContent(convertedUi)
                    dispatch(updateCatalogueItems({items: convertedUi}))
                    setIsEmptyVisible(convertedUi.length === 0)
                } else {
                    setError(result.message)
                }
            })
    }

    const onRefreshClick = async () => {
        loadCatalogue()
    }

    return {
        error,
        isEmptyVisible,
        onRefreshClick,
        content
    }
}