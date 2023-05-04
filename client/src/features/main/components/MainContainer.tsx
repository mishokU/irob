import {Route, Routes, useLocation} from "react-router-dom";
import {StartPage} from "../../start/components/StartPage";
import {CataloguePage} from "../../catalogue/ui/CataloguePage";
import {AuthPage} from "../../auth/components/AuthPage";
import {SettingsPage} from "../../settings/components/SettingsPage";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {ProfilePage} from "../../profile/components/ProfilePage";
import {HeaderComponent} from "../../header/components/HeaderComponent";
import {useModalsContext} from "../contexts/ModalsProvider";
import {AboutUsComponent} from "../../abousUs/components/AboutUsComponent";
import {RoomComponent} from "../../rooms/main/page/RoomComponent";
import {CreateRoomModal} from "../../rooms/main/dialogs/createRoom/CreateRoomModal";
import {useCreateRoomModalContext} from "../contexts/CreateRoomModalProvider";
import {NonAuthPage} from "../../noAuth/NonAuthPage";
import {NotificationMainComponent} from "../../notifications/NotificationMainComponent";
import {useNotificationContext} from "../contexts/NotificationModelProvider";
import {CreateLicenseModal} from "../../createContentModal/ui/CreateLicenseModal";
import {ContentFullCardComponent} from "../../contentFullCard/modal/ContentFullCardComponent";
import {useContentFullCardContext} from "../contexts/ContentFullCardProvider";
import {ContentFullCardPage} from "../../contentFullCard/page/ContentFullCardPage";
import {SamplePage} from "../../sample/SamplePage";
import {CommonNotification} from "../notifications/CommonNotification";
import {initNotification, usePopupContext} from "../contexts/NotificationProvider";
import {FaqPage} from "../../faq/FaqPage";

export function MainContainer() {
    const modalsContext = useModalsContext()
    const createRoomModalContext = useCreateRoomModalContext()
    const notificationContext = useNotificationContext()
    const contentCardFull = useContentFullCardContext()
    const location = useLocation();
    const popupContext = usePopupContext()
    {
        popupContext?.state.text !== undefined && setTimeout(() => {
            popupContext?.setState(initNotification())
        }, popupContext?.state.timeMs);
    }
    const isHeaderVisible: boolean =
        !location.pathname.toString().includes(IROBRoutes.rooms) &&
        !location.pathname.toString().includes(IROBRoutes.card) &&
        !location.pathname.toString().includes(IROBRoutes.sample)
    return <div className="relative">
        {popupContext?.state.text !== undefined && <CommonNotification
            text={popupContext.state.text}
            showTimeMs={popupContext.state.timeMs}
            position={popupContext.state.position}
        />}
        {createRoomModalContext?.isVisible && <CreateRoomModal/>}
        {modalsContext?.state.isVisible && <CreateLicenseModal roomId={modalsContext.state.roomId}/>}
        {contentCardFull?.isVisibleProps.isVisible && <ContentFullCardComponent/>}
        {notificationContext?.isVisible && <NotificationMainComponent/>}
        {isHeaderVisible && <HeaderComponent/>}
        <main>
            <Routes>
                <Route index element={<StartPage/>}/>
                <Route path={IROBRoutes.card} element={<ContentFullCardPage/>}/>
                <Route path={IROBRoutes.nonAuthPage} element={<NonAuthPage/>}/>
                <Route path={IROBRoutes.sample} element={<SamplePage/>}/>
                <Route path={IROBRoutes.home} element={<StartPage/>}/>
                <Route path={IROBRoutes.messages} element={<CataloguePage/>}/>
                <Route path={IROBRoutes.about} element={<AboutUsComponent/>}/>
                <Route path={IROBRoutes.rooms + "/:id"} element={<RoomComponent/>}/>
                <Route path={IROBRoutes.profile} element={<ProfilePage/>}/>
                <Route path={IROBRoutes.notification} element={<CataloguePage/>}/>
                <Route path={IROBRoutes.sell} element={<CataloguePage/>}/>
                <Route path={IROBRoutes.buy} element={<CataloguePage/>}/>
                <Route path={IROBRoutes.catalogue} element={<CataloguePage/>}/>
                <Route path={IROBRoutes.auth} element={<AuthPage/>}/>
                <Route path={IROBRoutes.settings} element={<SettingsPage/>}/>
                <Route path={IROBRoutes.faq} element={<FaqPage/>}/>
            </Routes>
        </main>
    </div>
}