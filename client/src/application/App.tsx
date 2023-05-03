import {MainContainer} from "../features/main/components/MainContainer";
import useViewModel from "./AppViewModel"
import {ErrorPage} from "../features/errors/ErrorPage";

function App() {
    const {state, onReloadClick} = useViewModel()
    return <div>
        {!state.error.isVisible && <MainContainer/>}
        {state.error.isVisible && <ErrorPage onClick={onReloadClick}/>}
    </div>
}

export default App;