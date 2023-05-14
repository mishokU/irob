import {Dispatch, useEffect, useState} from "react";
import {
    useCanClaimRewardMutation,
    useClaimRewardMutation,
    useDeleteLicenseMutation,
    useGetFavouriteLicensesMutation,
    useGetProfileLicensesMutation,
    useGetSoldLicensesMutation,
    useHandleFavouriteMutation
} from "../../../data/store/licenses/LicensesApi";
import {LicenseResponse, LicensesResponse} from "../../../data/models/common/LicensesResponse";
import {ClickType, getLicenseStatus, LicenseStatus, LicenseUiModel} from "./LicenseUiModel";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {LicenseMenu} from "../delegates/LicenseMenu";
import {signAndFinishContract} from "../../../domain/web3/signAndFinishContract";
import {DeleteProps, initDeleteLicenseProps} from "./LicenseItemPage";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {initNotification, usePopupContext} from "../../main/contexts/NotificationProvider";

export function LicenseItemViewModel(type: LicenseMenu, setIsVisible: Dispatch<DeleteProps>) {

    const profileReducer = useSelector((state: RootState) => state.profile)
    const configReducer = useSelector((state: RootState) => state.config)

    const [licenseItems, setLicenseItems] = useState<LicenseUiModel[]>([])

    const [getAllLicensesMutation] = useGetProfileLicensesMutation()
    const [getSoldLicensesMutation] = useGetSoldLicensesMutation()
    const [getFavouriteLicensesMutation] = useGetFavouriteLicensesMutation()
    const [postClaimReward] = useClaimRewardMutation()
    const [getCanClaimReward] = useCanClaimRewardMutation()

    const [deleteLicenseMutation] = useDeleteLicenseMutation()
    const [handleFavouriteMutation] = useHandleFavouriteMutation()

    const popupContext = usePopupContext()
    const navigate = useNavigate()

    useEffect(() => {

        async function loadLicenses() {
            if (type === LicenseMenu.MY_LICENSES) {
                const data = getAllLicensesMutation()
                return data.unwrap()
            } else if (type === LicenseMenu.SOLD) {
                const data = getSoldLicensesMutation()
                return data.unwrap()
            } else {
                const data = getFavouriteLicensesMutation()
                return data.unwrap()
            }
        }

        loadLicenses()
            .then((data: LicensesResponse) => {
                const items = data.licenses.map((license: LicenseResponse) => {
                    return {
                        status: getLicenseStatus(license.status),
                        name: license.name,
                        date: license.date,
                        userId: license.userId,
                        owner: license.owner,
                        type: license.type,
                        uid: license.uid,
                        address: license.address,
                        id: license.id,
                        roomId: license.roomId,
                        isClaimRewardVisible: getLicenseStatus(license.status) === LicenseStatus.success,
                        isPrivateKeyButtonVisible: license.isPrivateKeyButtonVisible,
                        isFavourite: license.isFavourite,
                        progress: license.progress,
                        isProgressVisible: false,
                        isUidVisible: false,
                    }
                })
                setLicenseItems(items)
            }).catch((error) => console.log(error))
    }, [])

    const onDeleteClick = async (license: LicenseUiModel | null) => {
        if (license !== null) {

            const licenseId = license.id

            if (license.status !== LicenseStatus.claimed) {
                if (license.userId === profileReducer.profileId) {
                    await signAndFinishContract(license.address, 0, configReducer.chainId)
                } else {
                    await signAndFinishContract(license.address, 100, configReducer.chainId)
                }
            }

            const result = await deleteLicenseMutation({licenseId: licenseId, address: license.address}).unwrap()

            if (result.success) {
                const filteredLicenses = licenseItems.filter((license) => license.id !== licenseId)
                setLicenseItems(filteredLicenses)
                setIsVisible(initDeleteLicenseProps(license))
            }

        }

    }

    const onMessagesClick = async (roomId: string) => {
        if (roomId === undefined) {
            popupContext?.setState(initNotification("Room does not exists!"))
        } else {
            navigate(IROBRoutes.rooms + "/" + roomId)
        }
    }

    const onLicenseClick = async (type: ClickType, license: LicenseUiModel) => {
        if (type === ClickType.updateVisibility) {
            await updateUidVisibility(license.id)
        } else if (type === ClickType.updateFavourite) {
            await onFavouriteClick(license.id)
        } else {
            await onClaimRewardClick(license)
        }
    }

    const onClaimRewardClick = async (license: LicenseUiModel) => {
        try {
            const isRewardAvailable = await getCanClaimReward(license.id).unwrap()
            if (isRewardAvailable.success) {
                await signAndFinishContract(license.address, isRewardAvailable.progress, configReducer.chainId)
                const result = await postClaimReward(license.id).unwrap()
                if (result.success) {
                    updateLicenseStatus(license.id)
                } else {
                    popupContext?.setState(initNotification("License status do not updated!"))
                }
            }
        } catch (e: any) {
            console.log(e.message)
            popupContext?.setState(initNotification("You can not claim reward!"))
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

    function updateLicenseStatus(licenseId: number) {
        const newLicenseItems = [...licenseItems];
        newLicenseItems.forEach((license) => {
            if (license.id === licenseId) {
                license.status = LicenseStatus.claimed
                license.isClaimRewardVisible = false
            }
        })
        setLicenseItems(newLicenseItems)
    }

    return {
        licenseItems, onDeleteClick, onMessagesClick, onLicenseClick, onShowProgressClick
    }

}