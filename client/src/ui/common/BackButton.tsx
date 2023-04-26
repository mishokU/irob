import {useNavigate} from "react-router-dom";
import backImg from "../assets/left_24px.png"

export function BackButton() {
    const navigate = useNavigate();
    return (<button
        type="button"
        onClick={() => {navigate(-1)}}
        className="w-[60px] bg-[#ffb81c] absolute m-8 z-10 rounded-full  p-4 text-center inline-flex">
        <img src={backImg}/>
        <span className="sr-only">Icon description</span>
    </button>)
}