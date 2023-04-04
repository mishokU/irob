import {useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {useEffect, useState} from "react";
import {
    useGetMakeDealMutation
} from "../../../../../data/store/rooms/RoomRequirementsApi";

export default function MakeDealViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [requiredRequirementCountMutation] = useGetMakeDealMutation()

    const [applyRequirementsCount, setApplyRequirementCount] = useState(0)
    const [fullApplyRequirementsCount, setFullApplyRequirementsCount] = useState(0)

    useEffect(() => {
        async function loadDeal() {
            return requiredRequirementCountMutation({
                roomId: roomReducer.roomId,
                userId: profileReducer.profileId
            }).unwrap()
        }

        loadDeal()
            .catch((e) => console.log(e))
            .then((data: any) => {
                setApplyRequirementCount(data.count)
                setFullApplyRequirementsCount(data.fullCount)
            })
    }, [])

    return {
        applyRequirementsCount,
        fullApplyRequirementsCount
    }

}