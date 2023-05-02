import {createContext, ReactNode, useContext, useState} from "react";

export enum NotificationPosition {
    RIGHT_TOP,
    CENTER_VERTICAL,
    CENTER
}

export interface INotification {
    text: string | undefined
    timeMs: number
    position: NotificationPosition
}

export function initNotification(
    text: string | undefined = undefined,
    timeMs: number | undefined = 3000,
    position = NotificationPosition.RIGHT_TOP
): INotification {
    return {
        text: text,
        timeMs: timeMs,
        position: position
    }
}

interface IContext {
    state: INotification
    setState: (state: INotification) => void;
}

const ModalsContext = createContext<IContext | null>(null)

const usePopupContext = () => useContext(ModalsContext)

export interface IProps {
    children?: ReactNode
}

const NotificationProvider = ({children}: IProps) => {
    const [state, setState] = useState<INotification>(initNotification())
    return <ModalsContext.Provider value={{state, setState}}>
        {children}
    </ModalsContext.Provider>
}

export {usePopupContext, NotificationProvider}