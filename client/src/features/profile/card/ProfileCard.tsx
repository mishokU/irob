import {buttonTheme} from "../../../themes/Themes";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {useNavigate} from "react-router-dom";
import useViewModel from "./ProfileCardViewModel"
import {useDispatch} from "react-redux";
import {clearProfile} from "../../../data/slices/ProfileSlice";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";

export function ProfileCard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authMiddleware = AuthMiddleware()
    const {profileReducer} = useViewModel()

    return <div className="text-center w-[380px] border-[#4a5058] h-fit border-2 p-4 rounded-2xl top-0">
        <div className="flex justify-center">
            <img className="rounded-full bg-white content-center w-[120px] h-[120px]" />
        </div>
        <h1 className="text-4xl mt-6">{profileReducer.fullName}</h1>
        <div className="space-y-2 mt-4">
            <p>@{profileReducer.nickname}</p>
            <p>{profileReducer.description}</p>
            <p>{profileReducer.followersCount} подписок</p>
        </div>
        <div className="flex space-x-2">
            <button className={buttonTheme + " mt-6 w-full"} onClick={() => {

            }}>Share
            </button>
            <button className={buttonTheme + " mt-6 w-full"} onClick={() => {
                authMiddleware.removeToken()
                dispatch(clearProfile())
                navigate(IROBRoutes.home)
            }}>Logout
            </button>
        </div>
        <button className={buttonTheme + " mt-6 w-full"} onClick={() => {
            navigate(IROBRoutes.settings)
        }}>Change profile
        </button>
    </div>
}