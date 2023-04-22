import * as React from 'react'
import {createContext, ReactNode, useContext, useState} from "react";

export interface ContentProps {
    isVisible: boolean
    contentId: number
    fromCatalogue: boolean
}

export function initContentProps(): ContentProps {
    return {
        isVisible: false,
        contentId: 0,
        fromCatalogue: true
    }
}

interface IModalContext {
    isVisibleProps: ContentProps
    setVisibility: (state: ContentProps) => void;
}

const ModalsContext = createContext<IModalContext | null>(null)

const useContentFullCardContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const ContentFullCardProvider = ({children}: IProps) => {
    const [isVisibleProps, setVisibility] = useState<ContentProps>(initContentProps)
    return <ModalsContext.Provider value={{isVisibleProps, setVisibility}}>
        {children}
    </ModalsContext.Provider>
}

export {useContentFullCardContext, ContentFullCardProvider}