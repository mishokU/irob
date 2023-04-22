import * as React from 'react'
import {createContext, ReactNode, useContext, useState} from "react";

export interface CreateCardProps {
    isVisible: boolean
    roomId: string | null
}

export function initCreateCardProps(): CreateCardProps {
    return {
        isVisible: false,
        roomId: null
    }
}

interface IModalContext {
    state: CreateCardProps
    setState: (state: CreateCardProps) => void;
}

const ModalsContext = createContext<IModalContext | null>(null)

const useModalsContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const ModalsProvider = ({children}: IProps) => {
    const [state, setState] = useState(initCreateCardProps)
    return <ModalsContext.Provider value={{state, setState}}>
        {children}
    </ModalsContext.Provider>
}

export {useModalsContext, ModalsProvider}