import React, { ReactNode, createContext, useState } from "react"
import { UserDTO } from "../dtos/userDTO"
import { NavigationContainer } from "@react-navigation/native"


type AuthContextDataProps = {
    user: UserDTO,
    signIn: (email: string, password: string) => Promise<void>
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps) //criado o contexto que será passado para o elemento filho

type AuthContextProviderProps = {
    children: ReactNode; //reactnode vai permitir eu renderizar qualquer coisa como filho do componente
}

export function AuthContextProvider({children} : AuthContextProviderProps) {

        const [user, setUser] = useState<UserDTO>(); //não há usuário autenticado no início

    function handleSignUp(){
        
    }


    return (
        // <NavigationContainer>
        //     <AuthContext.Provider value={{}}>
        //         {children}
        //     </AuthContext.Provider>
        // </NavigationContainer>
        <></>
    )
}