import {LicenseContentTabs} from "./LicenseContentTabs";
import {LicenseMenuHandlerDelegate} from "../delegates/LicenseMenuHandlerDelegate";
import {LicenseMenu} from "../delegates/LicenseMenu";
import {LicenseItemPage} from "../licenseType/LicenseItemPage";
import {ProfileSearchLicenses} from "../search/ProfileSearchLicenses";

export function LicensesPage() {
    const {menu, setMenu} = LicenseMenuHandlerDelegate()
    return <div>
        <LicenseContentTabs menu={menu} setMenu={setMenu} />
        {menu === LicenseMenu.MY_LICENSES && <LicenseItemPage type={LicenseMenu.MY_LICENSES} />}
        {menu === LicenseMenu.SOLD && <LicenseItemPage type={LicenseMenu.SOLD} />}
        {menu === LicenseMenu.FAVOURITE && <LicenseItemPage type={LicenseMenu.FAVOURITE} />}
        {menu === LicenseMenu.SEARCH && <ProfileSearchLicenses />}
    </div>
}