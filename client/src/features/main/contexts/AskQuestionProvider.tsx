import * as React from 'react'
import {createContext, ReactNode, useContext, useState} from "react";

export interface AskQuestionProps {
    isVisible: boolean
    email: string | null
}

export function initAskQuestionProps(email: string | null = null, isVisible = false): AskQuestionProps {
    return {
        isVisible: isVisible,
        email: email
    }
}

interface IModalContext {
    props: AskQuestionProps
    setVisibility: (state: AskQuestionProps) => void;
}

const ModalsContext = createContext<IModalContext | null>(null)

const useAskQuestionContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const AskQuestionProvider = ({children}: IProps) => {
    const [props, setVisibility] = useState<AskQuestionProps>(initAskQuestionProps)
    return <ModalsContext.Provider value={{props, setVisibility}}>
        {children}
    </ModalsContext.Provider>
}

export {useAskQuestionContext, AskQuestionProvider}