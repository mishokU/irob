import {useGetContentMutation} from "../../../data/store/content/ContentApi";
import {ContentFullCardState, initContentFullCardState} from "./ContentFullCardState";
import {useEffect, useState} from "react";

export default function ContentFullCardViewModel(contentId: any) {

    const [state, setState] = useState<ContentFullCardState>(initContentFullCardState())

    const [getContent] = useGetContentMutation()

    useEffect(() => {

        async function loadCard() {
            if(contentId){
                return await getContent(contentId).unwrap()
            }
        }

        loadCard()
            .catch((error) => console.log(error))
            .then((result: any) => {
                setState({
                    user: {
                        username: result.user.username,
                        avatar: result.user.avatar,
                        userId: result.user.userId,
                        description: result.user.description
                    },
                    content: {
                        id: result.content.id,
                        description: result.content.description,
                        category: result.content.category,
                        creationDate: result.content.date,
                        videoPreview: result.content.videoPreview,
                        type: result.content.type,
                        actors: result.content.actors,
                        country: result.content.country,
                        owner: result.content.owner,
                        videoTrailerUrl: result.content.trailer,
                        year: result.content.year,
                        duration: result.content.duration,
                        name: result.content.name,
                        startCost: result.content.cost,
                        startDate: result.content.startDate,
                        endDate: result.content.endDate,
                        genres: result.content.genres
                    }
                })
            })

    }, [])

    return {
        state
    }

}