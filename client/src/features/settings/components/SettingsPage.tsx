import {ProfileInfoComponent} from "../info/ProfileInfoComponent";
import {MenuDelegateHandler} from "../delegates/MenuDelegateHandler";
import {SettingsMenu} from "../delegates/SettingsMenu";
import {SettingsStrings} from "../strings/SettingsStrings";
import backImg from "../../../ui/assets/left_white_48px.png";
import {AccountManagementComponent} from "../accountManagement/AccountManagementComponent";
import {PersonalDataComponent} from "../personalData/PersonalDataComponent";
import {NotificationsComponent} from "../notifications/NotificationsComponent";
import {ConfidentialComponent} from "../confidential/ConfidentialComponent";
import {LedgerComponent} from "../ledger/LedgerComponent";
import {NetworkComponent} from "../network/NetworkComponent";
import useViewModel from "./SettingsViewModel"

export function SettingsPage() {
    const {activeMenu, setActiveMenu, onBackClick} = MenuDelegateHandler()
    const {profileReducer} = useViewModel()
    const menuStyle = "p-3 hover:border-[#4a5058] hover:text-white rounded-xl border-2 border-transparent"
    const menuStyleActive = "p-3 bg-[#1E252F] text-white rounded-xl border-[#29303A] border-2"
    return <div className="flex ml-12 mt-8 mt-24">
        <div className="w-[16em] text-white min-w-[14em]">
            <div className="flex space-x-2 pb-4" onClick={onBackClick}>
                <img className="w-[30px]" src={backImg}/>
                <p className="text-xl text-white underline cursor-pointer">Back to profile</p>
            </div>
            <div className="text-base text-gray-400 space-y-3 cursor-pointer">
                <div className={activeMenu === SettingsMenu.PROFILE ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.PROFILE)}>
                    <h1>{SettingsStrings.PublicProfile}</h1>
                </div>
                <div className={activeMenu === SettingsMenu.PERSONAL_DATA ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.PERSONAL_DATA)}>
                    <h1>{SettingsStrings.PersonalData}</h1>
                </div>
                <div className={activeMenu === SettingsMenu.ACCOUNT_MANAGEMENT ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.ACCOUNT_MANAGEMENT)}>
                    <h1>{SettingsStrings.AccountManagement}</h1>
                </div>
                <div className={activeMenu === SettingsMenu.NOTIFICATIONS ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.NOTIFICATIONS)}>
                    <h1>{SettingsStrings.Notifications}</h1>
                </div>
                <div className={activeMenu === SettingsMenu.CONFIDENTIAL ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.CONFIDENTIAL)}>
                    <h1>{SettingsStrings.PrivacyData}</h1>
                </div>
                <div className={activeMenu === SettingsMenu.LEDGER ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.LEDGER)}>
                    <h1>{SettingsStrings.Ledger}</h1>
                </div>
                {/* <div className={activeMenu === SettingsMenu.PROGRAM ? menuStyleActive : menuStyle}
                     onClick={() => setActiveMenu(SettingsMenu.PROGRAM)}>
                    <h1>{SettingsStrings.ReferralProgram}</h1>
                </div> */}
                {profileReducer.isAdmin &&
                    <div className={activeMenu === SettingsMenu.CRM ? menuStyleActive : menuStyle}
                         onClick={() => setActiveMenu(SettingsMenu.CRM)}>
                        <h1>{SettingsStrings.NetworkChanger}</h1>
                    </div>}
            </div>
        </div>
        <div className="lg:ml-36 md:ml-16 sm:ml-8">
            {activeMenu === SettingsMenu.PROFILE && <div className="justify-center">
                <ProfileInfoComponent/>
            </div>}
            {activeMenu === SettingsMenu.ACCOUNT_MANAGEMENT && <div className="justify-center">
                <AccountManagementComponent/>
            </div>}
            {activeMenu === SettingsMenu.PERSONAL_DATA && <div className="justify-center">
                <PersonalDataComponent/>
            </div>}
            {activeMenu === SettingsMenu.NOTIFICATIONS && <div className="justify-center">
                <NotificationsComponent/>
            </div>}
            {activeMenu === SettingsMenu.CONFIDENTIAL && <div className="justify-center">
                <ConfidentialComponent/>
            </div>}
            {activeMenu === SettingsMenu.LEDGER && <div className="justify-center">
                <LedgerComponent/>
            </div>}
            {activeMenu === SettingsMenu.CRM && <div className="justify-center">
                <NetworkComponent/>
            </div>}
        </div>
    </div>
}