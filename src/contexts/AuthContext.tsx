import React, { ReactNode, createContext, useState } from "react"
import { UserDTO } from "../dtos/userDTO"
import { NavigationContainer } from "@react-navigation/native"


export type AuthContextDataProps = {
    user: UserDTO|undefined,
    signIn: (email: string, password: string) => void
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps) //criado o contexto que será passado para o elemento filho

type AuthContextProviderProps = {
    children: ReactNode; //reactnode vai permitir eu renderizar qualquer coisa como filho do componente
}

export function AuthContextProvider({children} : AuthContextProviderProps) {
 //vou passar essa children com o auth no app para levar o contexto do filho pro pai
 
        const [user, setUser] = useState<UserDTO>({} as UserDTO); //não há usuário autenticado no início

    function handleSignUp(){
        
    }

    function signIn(email: string, password: string){
        
    }


    return (
            <AuthContext.Provider value={{
                user,
                signIn,
            }}>
                {children}
            </AuthContext.Provider>
    )
}