import {useGetContentMutation} from "../../../data/store/content/ContentApi";
import {ContentFullCardState, initContentFullCardState} from "./ContentFullCardState";
import {useEffect, useState} from "react";

export function ContentFullCardViewModel(contentId: number) {

    const [state, setState] = useState<ContentFullCardState>(initContentFullCardState())

    const [getContent] = useGetContentMutation()

    useEffect(() => {

        async function loadCard() {
            return getContent(contentId).unwrap()
        }

        loadCard()
            .catch((error) => console.log(error))
            .then((result) => {

            })

    }, [])

    return {
        state
    }

}