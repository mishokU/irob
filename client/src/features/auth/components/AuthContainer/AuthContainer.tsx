import {IPath, IRoutes} from "../../../../routes/IROBRoutes";
import {Route, Routes} from "react-router-dom";
import {AuthComponent} from "../AuthComponent";

export function AuthContainer({routes}: IRoutes, {path} : IPath) {
    return (<>
        <Routes>
            <Route index element={<AuthComponent routes={routes} />}/>
        </Routes>
    </>)
}