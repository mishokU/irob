import {NonAuthHeader} from "../../header/components/NonAuthHeader";
import {Route, Routes, useLocation} from "react-router-dom";
import {StartPage} from "../../start/components/StartPage";
import {CataloguePage} from "../../catalogue/CataloguePage";
import {AuthContainer} from "../../auth/components/AuthContainer/AuthContainer";
import {IMain} from "../../../App";
import {Header} from "../../header/components/Header";

export function MainContainer({routes, isUserLogged}: IMain) {
    const location = useLocation()
    return (<div>
        {location.pathname !== routes.auth && isUserLogged && <NonAuthHeader routes={routes} />}
        {location.pathname !== routes.auth && !isUserLogged && <Header routes={routes} />}
        <Routes>
            <Route index element={<StartPage routes={routes} />} />
            <Route path={routes.home} element={<StartPage routes={routes} />}></Route>
            <Route path={routes.messages} element={<CataloguePage />} />
            <Route path={routes.profile} element={<CataloguePage />} />
            <Route path={routes.notification} element={<CataloguePage />} />
            <Route path={routes.sell} element={<CataloguePage />} />
            <Route path={routes.buy} element={<CataloguePage />} />
            <Route path={routes.catalogue} element={<CataloguePage />} />
            <Route path={routes.auth} element={<AuthContainer routes={routes} />} />
        </Routes>
    </div>)
}