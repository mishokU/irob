import {ProfileContentTabs} from "./ProfileContentTabs";
import {ProfileCard} from "../card/ProfileCard";
import {ProfileMenuHandlerDelegate} from "../delegates/ProfileMenuHandlerDelegate";
import {ProfileMenu} from "../delegates/ProfileMenu";
import {LicensesPage} from "./LicensesPage";
import {RoomsProfilePage} from "../rooms/RoomsProfilePage";
import {ProfileContentPage} from "../content/ProfileContentPage";
import {ProfileLedgerPage} from "../ledger/page/ProfileLedgerPage";
import {DevelopersPage} from "../developers/page/DevelopersPage";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";

export function ProfilePage() {
    const {menu, setMenu} = ProfileMenuHandlerDelegate()
    const authMiddleware = AuthMiddleware()
    return <div className="lg:ml-16 lg:mr-0 ml-4 mr-4 lg:mt-16 mt-4 pb-8">
        {authMiddleware.getToken() !== null && <div className="lg:flex text-white space-y-4 lg:space-y-0">
            <div>
                <ProfileCard/>
            </div>
            <div className="space-y-4 lg:ml-16 ml-0 w-full lg:mr-16 mr-0">
                <ProfileContentTabs menu={menu} setMenu={setMenu}/>
                {menu === ProfileMenu.Rooms && <RoomsProfilePage/>}
                {menu === ProfileMenu.License && <LicensesPage/>}
                {menu === ProfileMenu.Content && <ProfileContentPage/>}
                {menu === ProfileMenu.Ledger && <ProfileLedgerPage/>}
                {menu === ProfileMenu.Developers && <DevelopersPage/>}
            </div>
        </div>}
        {authMiddleware.getToken() === null && <div className="flex justify-center items-center">
            <h1>User not logged!</h1>
        </div>}
    </div>
}