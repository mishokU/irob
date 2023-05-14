import {useGetConfigMutation} from "../data/store/config/ConfigApi";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setConfig} from "../data/slices/IrobConfigSlice";
import {ConfigResponse, IrobNetwork} from "../data/models/config/ConfigResponse";
import {AppState, initAppState} from "./AppState";


export default function AppViewModel() {

    const [getConfig] = useGetConfigMutation()

    const [state, setState] = useState<AppState>(initAppState(false))

    const dispatch = useDispatch();

    useEffect(() => {
        loadConfig()
    }, [])

    async function fetch() {
        return await getConfig().unwrap()
    }

    async function loadConfig() {
        try {
            fetch().then((data: ConfigResponse) => {
                if (data.success) {
                    const activeNetwork = data.networks.filter((network: IrobNetwork) => network.isEnabled)[0]
                    setState(initAppState(activeNetwork.chainId !== 1))
                    dispatch(setConfig({
                        chainId: activeNetwork.chainId,
                        chainHexId: activeNetwork.networkHex
                    }))
                }
            }).catch((throwable) => setState({
                inTestMode: false,
                error: {
                    message: throwable.message,
                    isVisible: true
                }
            }))
        } catch (e) {
            console.log(e)
        }
    }

    const onReloadClick = async () => {

        await loadConfig()

    }

    const onCloseTestNotificationClick = () => {
        setState({
            ...state,
            inTestMode: false
        })
    }

    return {
        state,
        onReloadClick,
        onCloseTestNotificationClick
    }

}