import {LicenseMenu} from "../delegates/LicenseMenu";
import {useState} from "react";
import {DomainLicenseItem} from "../../../domain/catalogue/DomainLicenseItem";
import {FakeCatalogueItems} from "../../../data/datasources/FakeCatalogueItems";

export function LicenseItemViewModel() {

    const [licenseItems, setLicenseItems] = useState<DomainLicenseItem[]>([])

    function loadItems(type: LicenseMenu): DomainLicenseItem[] {
        return FakeCatalogueItems()
    }

    return {
        loadItems
    }

}