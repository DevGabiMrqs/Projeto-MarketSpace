import React, { ReactNode, createContext, useState } from "react"
import { userDTO } from "../dtos/userDTO"


type AuthContextDataProps = {
    user: userDTO,
    signIn: (email: string, password: string) => Promise<void>
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps) //criado o contexto que será passado para o elemento filho

type AuthContextProviderProps = {
    children: ReactNode; //reactnode vai permitir eu renderizar qualqur coisa como filho do componente
}

export function AuthContextProvider({children} : AuthContextProviderProps) {

        const [user, setUser] = useState<userDTO>(); //não há usuário autenticado no início



    return (
        // <AuthContext.Provider value={{
        //     signUp
        // }}>
        //     {children}
        // </AuthContext.Provider>
        <></>
    )
}