import ic_bookmark from '../asserts/bookmark.png';
import ic_chat from '../asserts/chat.png';
import ic_delete from '../asserts/outline_delete_white_24dp.png'

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

export function LicenseElement() {
    const isActive = false
    return <div>
        <div className="w-full h-[50px] cursor-pointer rounded rounded-xl border-[#4a5058] hover:text-white rounded-xl border-2 hover:border-gray-500 flex justify-start items-center">
            <div className="space-x-4 flex ml-6 justify-start items-center w-full mr-16">
                <div className="flex space-x-4 items-center">
                    {isActive ? <div className="bg-green-500 w-3 h-3 rounded rounded-full" /> :
                        <div className="bg-red-500 w-3 h-3 rounded rounded-full" />}
                    <h1>Фильм</h1>
                    <h2 className="line-clamp-1 w-max max-w-[170px]">Звездные Войны</h2>
                    <h1 className="line-clamp-1 w-max max-w-[170px]">Lucas Films</h1>
                    <h1>03.12.1999</h1>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full"></div>
                </div>
                <div className="flex space-x-3">
                    <img className="w-8 h-8" src={ic_bookmark}/>
                    <img className="w-8 h-8" src={ic_chat}/>
                    <img className="w-8 h-8" src={ic_delete}/>
                </div>
            </div>
        </div>
    </div>
}