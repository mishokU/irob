import {LicenseMenu} from "../delegates/LicenseMenu";
import {LicenseItemViewModel} from "./LicenseItemViewModel";
import {LicenseElement} from "./LicenseElement";
import {DeleteLicenseModal} from "./DeleteLicenseModal";
import {useState} from "react";
import {LicenseUiModel} from "./LicenseUiModel";

export interface LicenseTypePage {
    type: LicenseMenu
}

export interface DeleteProps {
    isVisible: boolean
    license: LicenseUiModel | null
}

export function LicenseItemPage({type}: LicenseTypePage) {
    const [isVisible, setIsVisible] = useState<DeleteProps>({isVisible: false, license: null})
    const {licenseItems, onMessagesClick, onDeleteClick, onLicenseClick, onShowProgressClick} = LicenseItemViewModel(type, setIsVisible)
    return <div className="gap-4">
        <DeleteLicenseModal props={isVisible} setIsVisible={setIsVisible} onDeleteClick={onDeleteClick} />
        <div className="mt-4 space-y-4">
            {licenseItems.map(license => (<LicenseElement
                license={license}
                onMessagesClick={onMessagesClick}
                onShowDeleteModalClick={setIsVisible}
                onLicenseClick={onLicenseClick}
                onShowProgressClick={onShowProgressClick}
            />))}
            {licenseItems.length === 0 && <div className="ml-2 text-xl">
                You do not have any licenses
            </div>}
        </div>
    </div>
}