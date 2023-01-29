import * as React from 'react'
import {createContext, ReactNode, useContext, useState} from "react";
import AuthMiddleware from "./AuthMiddleware";

interface IAuth {
    token: string | null
}

interface IAuthContext {
    auth: IAuth;
    setAuth: (state: IAuth) => void;
}

const AuthContext = createContext<IAuthContext | null>(null)

const useAuthContext = () => useContext(AuthContext)

export interface IProps {
    children?: ReactNode
}

const AuthProvider = ({children}: IProps) => {
    const authMiddleware = AuthMiddleware()
    const [auth, setAuth] = useState({token: authMiddleware.getToken()})
    if(auth.token == null){
        authMiddleware.removeToken()
    } else {
        authMiddleware.saveToken(auth.token)
    }
    return <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
}

export {useAuthContext, AuthProvider}