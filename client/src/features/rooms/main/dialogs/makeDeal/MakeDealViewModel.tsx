import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {useEffect, useState} from "react";
import {
    useGetMakeDealMutation
} from "../../../../../data/store/rooms/RoomRequirementsApi";
import {updateFirstAgreement, updateSecondAgreement} from "../../../../../data/slices/RoomSlice";

export default function MakeDealViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [requiredRequirementCountMutation] = useGetMakeDealMutation()

    const [applyRequirementsCount, setApplyRequirementCount] = useState(0)
    const [fullApplyRequirementsCount, setFullApplyRequirementsCount] = useState(0)
    const [isContentExist, setIsContentExists] = useState(false)

    const dispatch = useDispatch();

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
                setIsContentExists(data.isContentExists)
                dispatch(updateFirstAgreement(data.firstAgreement))
                dispatch(updateSecondAgreement(data.secondAgreement))
            })
    }, [])

    return {
        isContentExist,
        applyRequirementsCount,
        fullApplyRequirementsCount
    }

}