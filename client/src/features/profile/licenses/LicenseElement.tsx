import ic_bookmark from "../asserts/obookmark_24px.png";
import ic_bookmark_filled from "../asserts/bookmark_24px.png"
import ic_chat from "../asserts/chat.png";
import ic_delete from "../asserts/remove_24px.png";
import {ClickType, LicenseStatus, LicenseUiModel} from "./LicenseUiModel";
import {DeleteProps} from "./LicenseItemPage";
import ic_show_secret from "../asserts/password_key_48px.png"
import ic_progress from "../asserts/progress.png"


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
    onLicenseClick: (type: ClickType, licenseId: number) => void
}

export function LicenseElement({
                                   license, onLicenseClick, onMessagesClick, onShowDeleteModalClick, onShowProgressClick
                               }: LicenseElementProps) {
    return (<div key={license.id}>
        <div
            className="w-full h-[50px] cursor-pointer rounded rounded-xl border-[#4a5058]
            hover:text-white rounded-xl border-2 hover:border-gray-500 flex justify-start items-center"
        >
            <div className="space-x-4 flex ml-6 justify-between items-center w-full mr-4">
                <div className="flex w-fit space-x-4 items-center">
                    {license.status === LicenseStatus.running ? (
                        <div className="bg-green-500 w-3 h-3 min-w-[12px] rounded rounded-full"/>) : (
                        <div className="bg-red-500 w-3 h-3 min-w-[12px] rounded rounded-full"/>)}
                    { license.type && <h1 className="select-none min-w-fit">{license.type}</h1>}
                    { license.name && <h2 className="line-clamp-1 min-w-fit max-w-[150px] select-none">{license.name}</h2>}
                    { license.owner && <h1 className="line-clamp-1 min-w-fit max-w-[150px] select-none">{license.owner}</h1>}
                    <h1 className="min-w-fit line-clamp-1 select-none">{license.date}</h1>
                </div>
                <div className="flex w-fit space-x-3">
                    {
                        license.isPrivateKeyButtonVisible && <div
                            className="z-10"
                            onClick={() => onLicenseClick(ClickType.updateVisibility, license.id)}>
                            <img className="w-8 h-8 min-w-fit" src={ic_show_secret}/>
                        </div>
                    }
                    <div
                        className="z-10"
                        onClick={() => onLicenseClick(ClickType.updateFavourite, license.id)}>
                        <img className="w-8 h-8 min-w-fit"
                             src={license.isFavourite ? ic_bookmark_filled : ic_bookmark}/>
                    </div>
                    <div onClick={() => onShowProgressClick(license.id)}>
                        <img className="w-8 h-8 min-w-fit" src={ic_progress}/>
                    </div>
                    <div onClick={() => onMessagesClick(license.roomId)}>
                        <img className="w-8 h-8 min-w-fit" src={ic_chat}/>
                    </div>
                    <div onClick={() => onShowDeleteModalClick({
                        isVisible: true, license: license
                    })}>
                        <img className="w-8 h-8 min-w-fit" src={ic_delete}/>
                    </div>
                </div>
            </div>
        </div>
        {license.isUidVisible && <div className="flex space-x-4 mt-2 ml-6">
            <h1>License key:</h1>
            <div className="text-white">
                {license.uid}
            </div>
        </div>}
        {
            license.isProgressVisible && <div className="mt-2 ml-6 mr-6">
                <h1>Progress of your license</h1>
                <div className="bg-gray-200 w-full inline-block rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 w-full rounded-full" style={{width: `${license.progress}%`}}></div>
                </div>
            </div>
        }
    </div>);
}