import {useState} from "react";
import {IROBRoutes} from "../../../../../routes/IROBRoutes";
import {useCreateRoomModalContext} from "../../../../main/CreateRoomModalProvider";
import {useNavigate} from "react-router-dom";
import {useCreateRoomMutation} from "../../../../../data/store/rooms/RoomsApi";
import {useDispatch} from "react-redux";
import {updateRoomId} from "../../../../../data/slices/RoomSlice";

export const roomsLink = "http://localhost:3000/rooms/"

export default function CreateRoomViewModel(errorState: (value: string) => void) {

    const [linkText] = useState(generateRoomLink())
    const [title, setTitle] = useState("")
    const [createRoomMutation] = useCreateRoomMutation()

    const dispatch = useDispatch()
    const createRoomModalContext = useCreateRoomModalContext()
    const navigate = useNavigate()

    function generateRoomLink() {
        const randomRoom = (Math.random() + 1).toString(36).substring(7);
        return roomsLink + randomRoom
    }

    function getRoomLink() {
        const fullLink = linkText.split("/")
        return "" + fullLink.at(fullLink.length - 1);
    }

    const createRoom = async () => {
        try {
            const roomId = getRoomLink()
            const payload = await createRoomMutation({roomId, title}).unwrap()
            createRoomModalContext?.setVisibility(false)
            dispatch(updateRoomId(payload))
            navigate(IROBRoutes.rooms + "/" + payload, {state: {path: linkText}})
        } catch (exception: any) {
            console.log(exception)
            errorState(exception)
        }
    }

    return {
        linkText, createRoom, title, setTitle
    }

}