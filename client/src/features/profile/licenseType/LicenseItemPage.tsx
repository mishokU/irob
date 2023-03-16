import {LicenseMenu} from "../delegates/LicenseMenu";
import {LicenseItemViewModel} from "./LicenseItemViewModel";
import {LicenseElement} from "./LicenseElement";

export interface LicenseTypePage {
    type: LicenseMenu
}

export function LicenseItemPage({type}: LicenseTypePage) {
    const {
        licenseItems,
        onMessagesClick,
        onDeleteClick,
        onLicenseClick
    } = LicenseItemViewModel()

    return <div className="gap-4">
        <div className="mt-4 space-y-4">
            {licenseItems.map(license => (
                LicenseElement(license, onMessagesClick, onDeleteClick, onLicenseClick)))}
            {
                licenseItems.length === 0 && <div className="ml-2 text-xl">
                    You do not have any licenses
                </div>
            }
        </div>
    </div>
}