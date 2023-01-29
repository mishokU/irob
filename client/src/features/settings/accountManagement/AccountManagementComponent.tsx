import {SettingsStrings} from "../strings/SettingsStrings";
import {buttonTheme} from "../../../themes/Themes";

export function AccountManagementComponent() {
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white w-[550px]">
        <h1 className="text-xl font-bold">{SettingsStrings.AccountManagement}</h1>
        <p className="mt-4 text-[#8fadc0]">Вносите изменения в адрес электронной почты, пароль и тип аккаунта. Эта информация является
            конфиденциальной и не будет отображаться в вашем общедоступном профиле.
        </p>
        <div className="mt-8">
            <p className="mt-4">Электронная почта • Скрытая информация</p>
            <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <div className="mt-8">
            <p className="mt-4">Password</p>
            <input className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <h1 className="text-xl mt-8 font-bold">Изменение аккаунта</h1>
        <h2 className="text-lg mt-6">Преобразуйте личный аккаунт в бизнес-аккаунт</h2>
        <p className="mt-6 text-[#8fadc0]">Выведите свои бизнес и бренд на новый уровень с помощью таких инструментов, как реклама и
            аналитика. Ваши материалы, профиль и подписчики останутся без изменений.
        </p>
        <div className="flex mt-4 justify-between items-center">
            <div>
                <h2 className="text-lg">Отключить аккаунт</h2>
                <p className="text-[#8fadc0] text-base">Скрыть пины и профиль</p>
            </div>
            <div>
                <button className={buttonTheme + " w-full m-auto"} onClick={() => {

                }}>Reset
                </button>
            </div>
        </div>
        <div className="flex mt-4 justify-between items-center">
            <div>
                <h2 className="text-lg">Удаление данных и аккаунта</h2>
                <p className="text-[#8fadc0] text-base">Удалить аккаунт и его данные</p>
            </div>
            <div>
                <button className={buttonTheme + " m-auto w-full"} onClick={() => {

                }}>Delete
                </button>
            </div>
        </div>
    </div>
}