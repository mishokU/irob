import {ProfileContentTabs} from "./ProfileContentTabs";
import {ProfileCard} from "../card/ProfileCard";
import {ProfileMenuHandlerDelegate} from "../delegates/ProfileMenuHandlerDelegate";
import {ProfileMenu} from "../delegates/ProfileMenu";
import {LicensesPage} from "./LicensesPage";
import {ProfileLedgerPage} from "../ledger/ProfileLedgerPage";
import {DevelopersPage} from "../developers/DevelopersPage";
import {useState} from "react";
import {CreateLicenseModal} from "../../createLicenseModal/CreateLicenseModal";
import {RoomsProfilePage} from "../rooms/RoomsProfilePage";

export function ProfilePage() {
    const {menu, setMenu} = ProfileMenuHandlerDelegate()
    const [isCreateNewLicenseModalVisible, setIsCreateNewLicenseModalVisible] = useState(false)
    return <div className="ml-16 mt-16 pb-8">
        <CreateLicenseModal isVisible={isCreateNewLicenseModalVisible} setIsVisible={setIsCreateNewLicenseModalVisible} />
        <div className="flex text-white">
            <div>
                <ProfileCard />
            </div>
            <div className="space-y-4 ml-16 w-full mr-16">
                <ProfileContentTabs menu={menu} setMenu={setMenu} />
                {menu === ProfileMenu.Rooms && <RoomsProfilePage />}
                {menu === ProfileMenu.License && <LicensesPage />}
                {menu === ProfileMenu.Ledger && <ProfileLedgerPage />}
                {menu === ProfileMenu.Developers && <DevelopersPage />}
            </div>
        </div>
    </div>
}