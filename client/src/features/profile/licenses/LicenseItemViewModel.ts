import {Dispatch, useEffect, useState} from "react";
import {
    useDeleteLicenseMutation,
    useGetFavouriteLicensesMutation,
    useGetProfileLicensesMutation,
    useGetSoldLicensesMutation,
    useHandleFavouriteMutation
} from "../../../data/store/licenses/LicensesApi";
import {LicenseResponse} from "../../../data/models/common/LicensesResponse";
import {ClickType, getLicenseStatus, LicenseUiModel} from "./LicenseUiModel";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {LicenseMenu} from "../delegates/LicenseMenu";
import {signAndFinishContract} from "../../../domain/web3/signAndFinishContract";
import {DeleteProps} from "./LicenseItemPage";

export function LicenseItemViewModel(type: LicenseMenu, setIsVisible: Dispatch<DeleteProps>) {

    const [licenseItems, setLicenseItems] = useState<LicenseUiModel[]>([])

    const [getAllLicensesMutation] = useGetProfileLicensesMutation()
    const [getSoldLicensesMutation] = useGetSoldLicensesMutation()
    const [getFavouriteLicensesMutation] = useGetFavouriteLicensesMutation()

    const [deleteLicenseMutation] = useDeleteLicenseMutation()
    const [handleFavouriteMutation] = useHandleFavouriteMutation()

    const navigate = useNavigate()

    useEffect(() => {

        async function loadLicenses() {
            if (type === LicenseMenu.MY_LICENSES) {
                const data = getAllLicensesMutation()
                return data.unwrap()
            } else if (type === LicenseMenu.SOLD) {
                const data = getSoldLicensesMutation()
                return data.unwrap()
            } else if (type === LicenseMenu.FAVOURITE) {
                const data = getFavouriteLicensesMutation()
                return data.unwrap()
            }
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
                        type: license.type,
                        uid: license.uid,
                        address: license.address,
                        id: license.id,
                        roomId: license.roomId,
                        isPrivateKeyButtonVisible: license.isPrivateKeyButtonVisible,
                        isFavourite: license.isFavourite,
                        progress: license.progress,
                        isUidVisible: false,
                    }
                })
                setLicenseItems(items)
            })
    }, [])

    const onDeleteClick = async (license: LicenseUiModel | null) => {
        if (license !== null) {

            const licenseId = license.id

            const data = await signAndFinishContract(license.address)

            const result = await deleteLicenseMutation({licenseId: licenseId, address: license.address}).unwrap()

            if (result.success) {
                const filteredLicenses = licenseItems.filter((license) => license.id !== licenseId)
                setLicenseItems(filteredLicenses)
                setIsVisible({isVisible: false, license: null})
            }

        }

    }

    const onMessagesClick = async (roomId: string) => {
        if (roomId === null) {

        } else {
            navigate(IROBRoutes.rooms + "/" + roomId)
        }
    }

    const onLicenseClick = async (type: ClickType, licenseId: number) => {
        if (type === ClickType.updateVisibility) {
            await updateUidVisibility(licenseId)
        } else {
            await onFavouriteClick(licenseId)
        }
    }

    const onFavouriteClick = async (licenseId: number) => {
        const result = await handleFavouriteMutation(licenseId).unwrap()
        const newLicenseItems = [...licenseItems];
        newLicenseItems.forEach((license) => {
            if (license.id === licenseId) {
                license.isFavourite = result.isFavourite
            }
        })
        setLicenseItems(newLicenseItems)
    }

    const updateUidVisibility = async (licenseId: number) => {
        const newLicenseItems = [...licenseItems];
        newLicenseItems.forEach((license) => {
            if (license.id === licenseId) {
                license.isUidVisible = !license.isUidVisible
            }
        })
        setLicenseItems(newLicenseItems)
    }

    const onShowProgressClick = (licenseId: number) => {
        const newLicenseItems = [...licenseItems];
        newLicenseItems.forEach((license) => {
            if (license.id === licenseId) {
                license.isProgressVisible = !license.isProgressVisible
            }
        })
        setLicenseItems(newLicenseItems)
    }

    return {
        licenseItems, onDeleteClick, onMessagesClick, onLicenseClick, onShowProgressClick
    }

}