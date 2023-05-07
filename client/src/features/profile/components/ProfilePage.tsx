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
    return <div className="ml-16 mt-16 pb-8">
        {authMiddleware.getToken() !== null && <div className="flex text-white">
            <div>
                <ProfileCard/>
            </div>
            <div className="space-y-4 ml-16 w-full mr-16">
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