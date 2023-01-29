import * as React from 'react'
import {createContext, ReactNode, useContext, useState} from "react";

interface IModalContext {
    isVisible: boolean
    setVisibility: (state: boolean) => void;
}

const ModalsContext = createContext<IModalContext | null>(null)

const useCreateRoomModalContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const CreateRoomModalProvider = ({children}: IProps) => {
    const [isVisible, setVisibility] = useState(false)

    console.log(isVisible)

    return <ModalsContext.Provider value={{isVisible, setVisibility}}>
        {children}
    </ModalsContext.Provider>
}

export {useCreateRoomModalContext, CreateRoomModalProvider}