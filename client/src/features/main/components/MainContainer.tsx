import {Route, Routes, useLocation} from "react-router-dom";
import {StartPage} from "../../start/components/StartPage";
import {CataloguePage} from "../../catalogue/components/CataloguePage";
import {AuthPage} from "../../auth/components/AuthPage";
import {SettingsPage} from "../../settings/components/SettingsPage";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {ProfilePage} from "../../profile/components/ProfilePage";
import {HeaderComponent} from "../../header/components/HeaderComponent";
import {useModalsContext} from "../ModalsProvider";
import {LicenseFullCardComponent} from "../../licenseFullCard/LicenseFullCardComponent";
import {AboutUsComponent} from "../../abousUs/components/AboutUsComponent";
import {RoomComponent} from "../../rooms/components/RoomComponent";
import {CreateRoomModal} from "../../rooms/createRoom/CreateRoomModal";
import {useCreateRoomModalContext} from "../CreateRoomModalProvider";

export function MainContainer() {
    const modalsContext = useModalsContext()
    const createRoomModalContext = useCreateRoomModalContext()
    const location = useLocation();
    console.log(location.pathname)
    return <>
        {createRoomModalContext?.isVisible && <CreateRoomModal />}
        {modalsContext?.isVisible && <LicenseFullCardComponent />}
        {!location.pathname.toString().includes(IROBRoutes.rooms) && <HeaderComponent />}
        <Routes>
            <Route index element={<StartPage />} />
            <Route path={IROBRoutes.home} element={<StartPage />}></Route>
            <Route path={IROBRoutes.messages} element={<CataloguePage />} />
            <Route path={IROBRoutes.about} element={<AboutUsComponent />} />
            <Route path={IROBRoutes.rooms + "/:id"} element={<RoomComponent />} />
            <Route path={IROBRoutes.profile} element={<ProfilePage />} />
            <Route path={IROBRoutes.notification} element={<CataloguePage />} />
            <Route path={IROBRoutes.sell} element={<CataloguePage />} />
            <Route path={IROBRoutes.buy} element={<CataloguePage />} />
            <Route path={IROBRoutes.catalogue} element={<CataloguePage />} />
            <Route path={IROBRoutes.auth} element={<AuthPage />} />
            <Route path={IROBRoutes.settings} element={<SettingsPage />} />
        </Routes>
    </>
}