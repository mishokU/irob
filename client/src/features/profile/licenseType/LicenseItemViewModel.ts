import {useEffect, useState} from "react";
import {
    useDeleteLicenseMutation,
    useGetProfileLicensesMutation,
    useHandleFavouriteMutation
} from "../../../data/store/licenses/LicensesApi";
import {LicenseResponse} from "../../../data/models/common/LicensesResponse";
import {ClickType, getLicenseStatus, LicenseUiModel} from "./LicenseUiModel";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";

export function LicenseItemViewModel() {

    const [licenseItems, setLicenseItems] = useState<LicenseUiModel[]>([])

    const [getAllLicensesMutation] = useGetProfileLicensesMutation()
    const [deleteLicenseMutation] = useDeleteLicenseMutation()
    const [handleFavouriteMutation] = useHandleFavouriteMutation()

    const navigate = useNavigate()

    useEffect(() => {

        async function loadLicenses() {
            const data = getAllLicensesMutation()
            return data.unwrap()
        }

        loadLicenses()
            .catch((error) => console.log(error))
            .then((data: any) => {
                const items = data.licenses.map((license: LicenseResponse) => {
                    return {
                        status: getLicenseStatus(license.status),
                        name: license.name,
                        date: license.date,
                        owner: license.owner,
                        uid: license.uid,
                        id: license.id,
                        roomId: license.roomId,
                        isFavourite: license.isFavourite,
                        progress: license.progress,
                        isUidVisible: false,
                    }
                })
                setLicenseItems(items)
            })
    }, [])

    const onDeleteClick = async (licenseId: number) => {
        const result = await deleteLicenseMutation(licenseId)

    }

    const onMessagesClick = async (roomId: string) => {
        navigate(IROBRoutes.rooms + "/" + roomId)
    }

    const onLicenseClick = async (type: ClickType, licenseId: number) => {
        console.log(type)
        if (type === ClickType.updateVisibility) {
            await updateUidVisibility(licenseId)
        } else {
            await onFavouriteClick(licenseId)
        }
    }

    async function onFavouriteClick(licenseId: number) {
        const result = await handleFavouriteMutation(licenseId)
        const newLicenseItems = [...licenseItems];
        newLicenseItems.forEach((license) => {
            if (license.id === licenseId) {
                license.isFavourite = !license.isFavourite
            }
        })
        setLicenseItems(newLicenseItems)
    }

    async function updateUidVisibility(licenseId: number) {
        const newLicenseItems = [...licenseItems];
        newLicenseItems.forEach((license) => {
            if (license.id === licenseId) {
                license.isUidVisible = !license.isUidVisible
            }
        })
        setLicenseItems(newLicenseItems)
    }

    return {
        licenseItems,
        onFavouriteClick,
        onDeleteClick,
        onMessagesClick,
        onLicenseClick
    }

}