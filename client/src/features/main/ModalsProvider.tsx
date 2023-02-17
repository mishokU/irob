import * as React from 'react'
import {createContext, ReactNode, useContext, useState} from "react";

interface IModalContext {
    isVisible: boolean
    setVisibility: (state: boolean) => void;
}

const ModalsContext = createContext<IModalContext | null>(null)

const useModalsContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const ModalsProvider = ({children}: IProps) => {
    const [isVisible, setVisibility] = useState(false)
    return <ModalsContext.Provider value={{isVisible, setVisibility}}>
        {children}
    </ModalsContext.Provider>
}

export {useModalsContext, ModalsProvider}