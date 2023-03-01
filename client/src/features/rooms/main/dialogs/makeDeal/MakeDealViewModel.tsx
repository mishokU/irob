import {useHandleAgreementMutation} from "../../../../../data/store/rooms/RoomsApi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {useEffect, useState} from "react";
import {updateFirstAgreement, updateSecondAgreement} from "../../../../../data/slices/RoomSlice";
import {useGetRequiredRequirementsCountMutation} from "../../../../../data/store/rooms/RoomRequirementsApi";

export default function MakeDealViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [agreementMutation] = useHandleAgreementMutation()
    const [requiredRequirementCountMutation] = useGetRequiredRequirementsCountMutation()

    const [agreementCount, setAgreementCount] = useState(getAgreementCount())

    const [applyRequirementsCount, setApplyRequirementCount] = useState(0)
    const [fullApplyRequirementsCount, setFullApplyRequirementsCount] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        async function loadDeal() {
            return requiredRequirementCountMutation(roomReducer.roomId).unwrap()
        }

        loadDeal()
            .catch((e) => console.log(e))
            .then((data: any) => {
                setApplyRequirementCount(data.count)
                setFullApplyRequirementsCount(data.fullCount)
            })
    }, [])

    const onAgreementClick = async () => {
        try {
            const isAgreed = getAgreement()
            const payload: any = await agreementMutation({
                roomId: roomReducer.roomId, userId: profileReducer.profileId, isAgreed: isAgreed
            }).unwrap()
            updateAgreementCount(payload.isAgreed)
        } catch (e) {
            console.log(e)
        }
    }

    function getAgreement() {
        let isAgreed = false
        if (roomReducer.ownerId === profileReducer.profileId) {
            isAgreed = roomReducer.firstAgreement
            dispatch(updateFirstAgreement(!roomReducer.firstAgreement))
        } else if (roomReducer.userId === profileReducer.profileId) {
            isAgreed = roomReducer.secondAgreement
            dispatch(updateSecondAgreement(!roomReducer.secondAgreement))
        }
        return isAgreed
    }

    function getAgreementCount(): number {
        let count = 0
        if (roomReducer.firstAgreement) {
            count += 1
        }
        if (roomReducer.secondAgreement) {
            count += 1
        }
        return count
    }

    function updateAgreementCount(isAgreed: boolean) {
        if (isAgreed) {
            setAgreementCount(agreementCount + 1)
        } else {
            setAgreementCount(agreementCount - 1)
        }
    }

    return {
        onAgreementClick, agreementCount, applyRequirementsCount, fullApplyRequirementsCount
    }

}