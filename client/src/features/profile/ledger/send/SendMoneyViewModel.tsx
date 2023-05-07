import {useState} from "react";
import {signAndSendDeposit} from "../../../../domain/web3/signAndSendDeposit";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";
import {initNotification, usePopupContext} from "../../../main/contexts/NotificationProvider";


export default function SendMoneyViewModel(maxBalance: number) {

    const configReducer = useSelector((state: RootState) => state.config)

    const popupContext = usePopupContext()

    const [value, setValue] = useState("")
    const [address, setAddress] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onMaxClick = () => {
        setValue(maxBalance.toString())
    }

    const onSendClick = async () => {
        try {
            setError("")
            if(address !== ""){
                setIsLoading(true)
                await signAndSendDeposit(address, value, configReducer.chainHexId)
                popupContext?.setState(initNotification("Money send!"))
                setIsLoading(false)
            }
        } catch (e: any){
            setIsLoading(false)
            setError(e.message)
        }
    }

    return {
        value,
        error,
        isLoading,
        setValue,
        onMaxClick,
        setAddress,
        onSendClick
    }

}