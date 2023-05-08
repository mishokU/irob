import {useDeleteContentMutation, useGetContentMutation} from "../../../data/store/content/ContentApi";
import {ContentFullCardState, initContentFullCardState} from "./ContentFullCardState";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import avatarPlaceholder from "../../../ui/assets/avatart_placeholder.png";

export default function ContentFullCardViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)

    const location = useLocation();
    const contentId: any = location.state.contentId
    const fromCatalogue: boolean = location.state.fromCatalogue

    const [state, setState] = useState<ContentFullCardState>(initContentFullCardState())

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)

    const [deleteContent] = useDeleteContentMutation()
    const [getContent] = useGetContentMutation()

    const navigate = useNavigate()

    useEffect(() => {

        async function loadCard() {
            if (contentId) {
                return await getContent(contentId).unwrap()
            }
        }

        loadCard()
            .catch((error) => console.log(error))
            .then((result: any) => {
                setState({
                    isLoading: false,
                    isDeleteDialogButtonVisible: profileReducer.profileId === result.user.userId,
                    isTrailerVisible: false,
                    isCreateRoomButtonVisible: !result.user.isDeleted && profileReducer.profileId !== result.user.userId && fromCatalogue,
                    user: {
                        isDeleted: result.user.isDeleted,
                        username: result.user.username,
                        avatar: getAvatar(result.user.avatar),
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
                        videoTrailerUrl: result.content.trailerUrl,
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

    const onBackClick = () => {
        if (state.isTrailerVisible) {
            onHandlePlayerVisible()
        } else {
            navigate(-1)
        }
    }

    const handleDeleteCardClick = async () => {
        const result: any = await deleteContent(contentId).unwrap()
        if (result.success) {
            navigate(-1)
        }
    }

    const onHandlePlayerVisible = () => {
        setState({
            ...state,
            isTrailerVisible: !state.isTrailerVisible
        })
    }

    function getAvatar(avatar: string): string {
        if (avatar) {
            return avatar
        } else {
            return avatarPlaceholder
        }
    }

    return {
        state,
        isDeleteDialogVisible,
        setIsDeleteDialogVisible,
        onHandlePlayerVisible,
        handleDeleteCardClick,
        onBackClick
    }

}