import {IROBRoutes} from "./routes/IROBRoutes";
import {MainContainer} from "./features/main/components/MainContainer";
import {AuthMiddleware} from "./features/auth/middleware/AuthMiddleware";

export interface IMain {
    routes: IROBRoutes,
    isUserLogged: boolean
}

function App() {
    let irobRoutes = new IROBRoutes()
    let authMiddleware = new AuthMiddleware()
    return <div>
        <MainContainer routes={irobRoutes} isUserLogged={authMiddleware.isUserLogged()} />
    </div>
}
export default App;