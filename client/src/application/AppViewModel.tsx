import {useGetConfigMutation} from "../data/store/config/ConfigApi";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setConfig} from "../data/slices/IrobConfigSlice";
import {IrobNetwork} from "../data/models/config/ConfigResponse";
import {AppState, initAppState} from "./AppState";


export default function AppViewModel() {

    const [getConfig] = useGetConfigMutation()

    const [state, setState] = useState<AppState>(initAppState())

    const dispatch = useDispatch();

    useEffect(() => {
        loadConfig()
    }, [])

    async function fetch() {
        return await getConfig().unwrap()
    }

    async function loadConfig() {
        fetch()
            .catch((throwable) => setState({
                error: {
                    message: throwable.message,
                    isVisible: true
                }
            }))
            .then((data: any) => {
                if (data.success) {
                    setState(initAppState())
                    const activeNetwork = data.networks.filter((network: IrobNetwork) => network.isEnabled)[0]
                    dispatch(setConfig({
                        chainId: activeNetwork.chainId,
                        chainHexId: activeNetwork.networkHex,
                        networkUrl: activeNetwork.networkUrl
                    }))
                }
            })
    }

    const onReloadClick = async () => {

        await loadConfig()

    }

    return {
        state,
        onReloadClick
    }

}