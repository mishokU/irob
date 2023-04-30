import {useEffect, useState} from "react";
import {useGetConfigMutation, useUpdateConfigMutation} from "../../../data/store/config/ConfigApi";
import {IrobNetwork} from "../../../data/models/config/ConfigResponse";
import {UiNetwork} from "./UiNetwork";


export default function NetworkViewModel() {

    const [networks, setNetworks] = useState<UiNetwork[]>([])
    const [network, setNetwork] = useState("")

    const [getConfig] = useGetConfigMutation()
    const [updateConfig] = useUpdateConfigMutation()

    useEffect(() => {

        async function loadNetworks() {
            return await getConfig().unwrap()
        }

        loadNetworks()
            .catch((error) => console.log(error))
            .then((response: any) => {
                if (response) {
                    console.log(response)
                    const ui = response.networks.map((network: IrobNetwork) => {
                        return {
                            id: network.id,
                            name: network.name,
                            isEnabled: network.isEnabled
                        }
                    })
                    setNetworks(ui)
                }
            })
    }, [])

    const updateNetwork = async () => {
        const newNetworks = networks.filter((_network) => _network.name === network)
        const networkId = newNetworks.at(0)
        if (networkId) {
            await updateConfig({id: networkId.id}).unwrap()
        }
    }

    return {
        networks,
        setNetwork,
        updateNetwork
    }

}