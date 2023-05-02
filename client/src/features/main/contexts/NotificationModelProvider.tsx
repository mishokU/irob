import {createContext, ReactNode, useContext, useState} from "react";

interface IModalContext {
    isVisible: boolean
    setVisibility: (state: boolean) => void;
}

const ModalsContext = createContext<IModalContext | null>(null)

const useNotificationContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const CreateNotificationProvider = ({children}: IProps) => {
    const [isVisible, setVisibility] = useState(false)
    return <ModalsContext.Provider value={{isVisible, setVisibility}}>
        {children}
    </ModalsContext.Provider>
}

export {useNotificationContext, CreateNotificationProvider}