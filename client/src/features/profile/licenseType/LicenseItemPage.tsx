import {LicenseMenu} from "../delegates/LicenseMenu";
import {LicenseItemViewModel} from "./LicenseItemViewModel";
import {LicenseElement} from "./LicenseElement";
import {DeleteLicenseModal} from "./DeleteLicenseModal";
import {useState} from "react";

export interface LicenseTypePage {
    type: LicenseMenu
}

export interface DeleteProps {
    isVisible: boolean
    licenseId: number | null
}

export function LicenseItemPage({type}: LicenseTypePage) {
    const [isVisible, setIsVisible] = useState<DeleteProps>({isVisible: false, licenseId: null})
    const {licenseItems, onMessagesClick, onDeleteClick, onLicenseClick} = LicenseItemViewModel(type)
    return <div className="gap-4">
        <DeleteLicenseModal props={isVisible} setIsVisible={setIsVisible} onDeleteClick={onDeleteClick} />
        <div className="mt-4 space-y-4">
            {licenseItems.map(license => (<LicenseElement
                license={license}
                onMessagesClick={onMessagesClick}
                onShowDeleteModalClick={setIsVisible}
                onLicenseClick={onLicenseClick}
            />))}
            {licenseItems.length === 0 && <div className="ml-2 text-xl">
                You do not have any licenses
            </div>}
        </div>
    </div>
}