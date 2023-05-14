import {MainContainer} from "../features/main/components/MainContainer";
import useViewModel from "./AppViewModel"
import {ErrorPage} from "../features/errors/ErrorPage";
import close from "../ui/assets/close_black_24dp.svg"

function App() {
    const {state, onReloadClick, onCloseTestNotificationClick} = useViewModel()
    return <div>
        {state.inTestMode && <div
            className="w-screen h-[50px] flex justify-center items-center text-white bg-black">
            Service in test mode: use only Sepolia network for deals!
            <div
                onClick={onCloseTestNotificationClick}
                className="ml-8 cursor-pointer rounded-full border-2 border-white">
                <img alt="close" src={close}/>
            </div>
        </div>}
        {!state.error.isVisible && <MainContainer/>}
        {state.error.isVisible && <ErrorPage onClick={onReloadClick}/>}
    </div>
}
export default App;