import {MainContainer} from "../features/main/components/MainContainer";
import useViewModel from "./AppViewModel"
import {ErrorPage} from "../features/errors/ErrorPage";
import close from "../ui/assets/close_black_24dp.svg"

function App() {
    const {state, onReloadClick, onCloseTestNotificationClick} = useViewModel()
    return <div>
        {state.inTestMode && <div
            className="w-screen lg:h-[50px] h-fit pb-1 pt-1 lg:pr-0 pr-4 pl-4 lg:pl-0 flex justify-center items-center text-center text-white bg-black">
            Service in test mode: use only Sepolia network for deals!
            <div
                onClick={onCloseTestNotificationClick}
                className="lg:ml-8 md:ml-8 h-fit cursor-pointer lg:m-0 m-auto w-fit rounded-full border-2 border-white">
                <img alt="close" src={close}/>
            </div>
        </div>}
        {!state.error.isVisible && <MainContainer/>}
        {state.error.isVisible && <ErrorPage onClick={onReloadClick}/>}
    </div>
}
export default App;