import {useNavigate} from "react-router-dom";
import backImg from "../assets/left_24px.png";
import deleteImg from "../assets/delete_96px.png"

export function LeaveRoomButton() {
    const navigate = useNavigate();
    return (<button
        type="button"
        onClick={() => {navigate(-1)}}
        className="bg-[#ffb81c] absolute mt-8 ml-8 z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
        <img src={backImg}/>
        <span className="sr-only">Icon description</span>
    </button>)
}

export function DeleteRoomButton(){
    const navigate = useNavigate();
    return (<button
        type="button"
        onClick={() => {navigate(-1)}}
        className="bg-red-600 z-10 rounded-full w-14 h-14 p-4 text-center inline-flex">
        <img src={deleteImg}/>
        <span className="sr-only">Icon description</span>
    </button>)
}