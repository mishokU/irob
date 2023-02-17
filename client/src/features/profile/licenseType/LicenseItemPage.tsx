import {LicenseMenu} from "../delegates/LicenseMenu";
import {LicenseItemViewModel} from "./LicenseItemViewModel";
import {LicenseElement} from "./LicenseElement";

export interface LicenseTypePage {
    type: LicenseMenu
}

export function LicenseItemPage({type}: LicenseTypePage) {
    const {loadItems} = LicenseItemViewModel()
    return <div className="gap-4">
        <div className="mt-4 space-y-4">
            {loadItems(type)
                .map(license => (
                    LicenseElement()
                    // <CatalogueItemComponent type={license.name} key={license.name}
                    //                                      description={license.shortDescription}
                    //                                      contentAuthor={license.contentAuthor}
                    //                                      creationDate={license.creationDate} />
                ))}
        </div>
    </div>
}