import ic_bookmark from "../asserts/obookmark_24px.png";
import ic_bookmark_filled from "../asserts/bookmark_24px.png"
import ic_chat from "../asserts/chat.png";
import ic_delete from "../asserts/remove_24px.png";
import {ClickType, LicenseStatus, LicenseUiModel} from "./LicenseUiModel";
import {DeleteProps} from "./LicenseItemPage";
import ic_show_secret from "../asserts/password_key_48px.png"
import ic_reward from "../asserts/reward.png"
import ic_progress from "../asserts/progress.png"
import {ReactComponent as CopyIcon} from "../asserts/content_copy_white_24dp.svg";
import {initNotification, usePopupContext} from "../../main/contexts/NotificationProvider";


/*
    Ячейка лицензии будет полностью горизонтальная и в ней будет содержаться такая информация
    1) Активна или нет (зеленый или красный) индикатор
    2) Тип и название контента (Фильм Звездные Войны)
    3) Автор контента (Lucas Films)
    4) Дата публикации (03.12.1999)
    5) Прогресс заявки (сколько осталось времени или просмотров для закрытия лицензии)
    6) Справа будут 3 кнопки, если ты продавец (избранное - добавляет в избранное,
    перейти в чат с заказчиком - переводит в мессенджер(или открывает просто чат снизу)
    крестик - открывает диалоговое окно с подтверждением удаления)
    7) По клику на заявку, она будет чутка выпадать и снизу будет ключ лицензии скрытый.
 */

export interface LicenseElementProps {
    license: LicenseUiModel
    onMessagesClick: (roomId: string) => void
    onShowProgressClick: (licenseId: number) => void
    onShowDeleteModalClick: (props: DeleteProps) => void
    onLicenseClick: (type: ClickType, license: LicenseUiModel) => void
}

export function LicenseElement(
    {
        license,
        onLicenseClick,
        onMessagesClick,
        onShowDeleteModalClick,
        onShowProgressClick
    }: LicenseElementProps) {
    const notificationContext = usePopupContext()
    const invisibleBorder = `border-[#4a5058] border-2 rounded-xl w-full h-[50px] cursor-pointer flex justify-start items-center`
    const visibleBorder = `rounded-t-xl border-[#4a5058] border-2 w-full h-[50px] cursor-pointer flex justify-start items-center`
    const isVisible = license.isUidVisible || license.isProgressVisible
    return (<div key={license.id}>
        <div className={isVisible ? visibleBorder : invisibleBorder}>
            <div className="space-x-4 flex ml-6 justify-between items-center w-full mr-4">
                <div className="flex w-fit space-x-4 items-center">
                    {license.status === LicenseStatus.running && <div className="bg-green-500 w-3 h-3 min-w-[12px] rounded rounded-full"/>}
                    {license.status === LicenseStatus.canceled && <div className="bg-red-500 w-3 h-3 min-w-[12px] rounded rounded-full"/>}
                    {license.status === LicenseStatus.success && <div className="bg-[#ffb81c] w-3 h-3 min-w-[12px] rounded rounded-full"/>}
                    {license.status === LicenseStatus.claimed && <div className="bg-white w-3 h-3 min-w-[12px] rounded rounded-full"/>}
                    {license.type && <h1 className="select-none min-w-fit">{license.type}</h1>}
                    {license.name &&
                        <h2 className="line-clamp-1 min-w-fit max-w-[150px] select-none">{license.name}</h2>}
                    {license.owner &&
                        <h1 className="line-clamp-1 min-w-fit max-w-[150px] select-none">{license.owner}</h1>}
                    <h1 className="min-w-fit line-clamp-1 select-none">{license.date}</h1>
                </div>
                <div className="flex w-fit space-x-3">
                    {license.isClaimRewardVisible && <div
                        className="z-10"
                        onClick={() => onLicenseClick(ClickType.claimReward, license)}>
                        <img
                            alt="reward"
                            className="w-8 h-8 min-w-fit"
                            src={ic_reward}/>
                    </div>}
                    {license.isPrivateKeyButtonVisible && <div
                        className="z-10"
                        onClick={() => onLicenseClick(ClickType.updateVisibility, license)}>
                        <img
                            alt="show"
                            className="w-8 h-8 min-w-fit"
                            src={ic_show_secret}/>
                    </div>}
                    <div
                        className="z-10"
                        onClick={() => onLicenseClick(ClickType.updateFavourite, license)}>
                        <img
                            alt="bookmark"
                            className="w-8 h-8 min-w-fit"
                            src={license.isFavourite ? ic_bookmark_filled : ic_bookmark}/>
                    </div>
                    <div onClick={() => onShowProgressClick(license.id)}>
                        <img alt="progress" className="w-8 h-8 min-w-fit" src={ic_progress}/>
                    </div>
                    <div onClick={() => onMessagesClick(license.roomId)}>
                        <img alt="chat" className="w-8 h-8 min-w-fit" src={ic_chat}/>
                    </div>
                    <div onClick={() => onShowDeleteModalClick({isVisible: true, license: license})}>
                        <img alt="delete" className="w-8 h-8 min-w-fit" src={ic_delete}/>
                    </div>
                </div>
            </div>
        </div>
        {(license.isUidVisible || license.isProgressVisible) &&
            <div className="rounded-b-xl border-[#4a5058] border-b-2 border-l-2 border-r-2">
                {license.isUidVisible && <div className="flex items-center text-lg space-x-4 pt-2 pb-2 ml-6">
                    <h1>License key:</h1>
                    <h1 className="text-white">{license.uid}</h1>
                    <div className="bg-transparent hover:bg-black border-transparent p-2 hover:rounded-full"
                         onClick={() => {
                             navigator.clipboard.writeText(license.uid)
                             notificationContext?.setState(initNotification("Secret key copied!"))
                         }}>
                        <CopyIcon/>
                    </div>
                </div>}
                {license.isProgressVisible && <div className="pt-2 pb-2 text-lg ml-6 mr-6">
                    <h1>Progress of your license in {license.progress} to 100</h1>
                    <div className="bg-gray-200 w-full inline-block rounded-xl rounded-xl h-2.5 dark:bg-gray-700">
                        <div
                            className="bg-[#ffb81c] h-2.5 w-full rounded-full"
                            style={{width: `${license.progress}%`}}></div>
                    </div>
                </div>}
            </div>
        }
    </div>);
}