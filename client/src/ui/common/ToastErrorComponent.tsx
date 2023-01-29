import {IMessage} from "../interfaces/IMessage";
import {useState} from "react";

const errorShowTimeMs = 4000

export function useErrorToast() {
    const [message, setErrorMessage] = useState<string | null>(null)
    setTimeout(() => {
        setErrorMessage(null)
    }, errorShowTimeMs);
    return {
        message, setErrorMessage
    }
}

export function ErrorToastComponent({message}: IMessage) {
    return <div className="flex items-center absolute right-0 m-4 p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-white dark:divide-gray-700 space-x dark:bg-red-800"
                role="alert">
        <div className="pl-4 text-sm font-normal">{message}</div>
    </div>
}