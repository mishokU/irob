import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";

export default function RoomMessengerMainViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)

    function isAgreed(): boolean {
        return roomReducer.firstAgreement && roomReducer.secondAgreement
    }

    return {
        isAgreed
    }

}