import {RequirementsUpdatingInfo} from "../components/RequirementsUpdatingInfo";
import {GetVideoUrlInfo} from "../components/GetVideoUrlInfo";
import {IROBRoutes} from "../../../../routes/IROBRoutes";
import {buttonTheme} from "../../../../ui/themes/Themes";
import {useNavigate} from "react-router-dom";
import isDev from "../../../../domain/hooks/Utils";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";

export function DevelopersPage() {
    const navigate = useNavigate()
    const profileReducer = useSelector((state: RootState) => state.profile)
    return <div className="ml-4 mt-4 space-y-2">
        <h1 className="text-2xl">On this page you can find all necessary information about IROB API</h1>
        <div
            className="h-[36em] w-fit pr-6 overflow-y-scroll scrollbar">
            <GetVideoUrlInfo/>
            <RequirementsUpdatingInfo/>
            {(isDev() || profileReducer.isAdmin) && <button
                onClick={() => navigate(IROBRoutes.sample)}
                className={buttonTheme + " mt-2"}>
                Test site
            </button>}
        </div>
    </div>
}