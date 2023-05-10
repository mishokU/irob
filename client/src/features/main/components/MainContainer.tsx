import {Navigate, Route, Routes, useLocation} from "react-router-dom";
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
import {NotExistsPage} from "../../noAuth/NotExistsPage";
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
import {PolicyPrivacyPage} from "../../privacy/PolicyPrivacyPage";
import {TermsOfUsePage} from "../../termsOfUse/TermsOfUsePage";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";
import {useAskQuestionContext} from "../contexts/AskQuestionProvider";
import {AsqQuestionModal} from "../../faq/modals/AsqQuestionModal";

export function MainContainer() {
    const modalsContext = useModalsContext()
    const createRoomModalContext = useCreateRoomModalContext()
    const notificationContext = useNotificationContext()
    const contentCardFull = useContentFullCardContext()
    const location = useLocation()
    const popupContext = usePopupContext()
    const asqQuestionContext = useAskQuestionContext()
    const authMiddleware = AuthMiddleware()
    const isAuth = authMiddleware.getToken() !== null
    {
        popupContext?.state.text !== undefined && setTimeout(() => {
            popupContext?.setState(initNotification())
        }, popupContext?.state.timeMs)
    }
    const isHeaderVisible: boolean =
        !location.pathname.toString().includes(IROBRoutes.rooms) &&
        !location.pathname.toString().includes(IROBRoutes.card) &&
        !location.pathname.toString().includes(IROBRoutes.sample)
    return (<div className="relative">
        {popupContext?.state.text !== undefined && <CommonNotification
            text={popupContext.state.text}
            showTimeMs={popupContext.state.timeMs}
            position={popupContext.state.position}
        />}
        {createRoomModalContext?.isVisible && <CreateRoomModal/>}
        {modalsContext?.state.isVisible && <CreateLicenseModal roomId={modalsContext.state.roomId}/>}
        {contentCardFull?.isVisibleProps.isVisible && <ContentFullCardComponent/>}
        {notificationContext?.isVisible && <NotificationMainComponent/>}
        {asqQuestionContext?.props.isVisible && <AsqQuestionModal/>}
        {isHeaderVisible && <HeaderComponent/>}
        <main>
            <Routes>
                <Route path="*" element={<NotExistsPage/>}/>
                <Route index element={<StartPage/>}/>
                <Route path={IROBRoutes.nonAuthPage} element={<NotExistsPage/>}/>
                <Route path={IROBRoutes.sample} element={<SamplePage/>}/>
                <Route path={IROBRoutes.home} element={<StartPage/>}/>
                <Route path={IROBRoutes.about} element={<AboutUsComponent/>}/>
                <Route path={IROBRoutes.faq} element={<FaqPage/>}/>
                <Route path={IROBRoutes.privacy} element={<PolicyPrivacyPage/>}/>
                <Route path={IROBRoutes.terms} element={<TermsOfUsePage/>}/>
                <Route
                    path={IROBRoutes.card}
                    element={isAuth ? <ContentFullCardPage/> : <Navigate to={IROBRoutes.auth}/>}/>
                <Route
                    path={IROBRoutes.rooms + "/:id"}
                    element={isAuth ? <RoomComponent/> : <Navigate to={IROBRoutes.auth}/>}/>
                <Route
                    path={IROBRoutes.profile}
                    element={isAuth ? <ProfilePage/> : <Navigate to={IROBRoutes.auth}/>}/>
                <Route
                    path={IROBRoutes.catalogue}
                    element={isAuth ? <CataloguePage/> : <Navigate to={IROBRoutes.auth}/>}/>
                <Route path={IROBRoutes.auth} element={<AuthPage/>}/>
                <Route
                    path={IROBRoutes.settings}
                    element={isAuth ? <SettingsPage/> : <Navigate to={IROBRoutes.auth}/>}/>
            </Routes>
        </main>
    </div>)
}