import React, { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { NavigationContainer } from "@react-navigation/native";
import { api } from "../services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "../storage/storageAuthToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";


export type AuthContextDataProps = {
    user: UserDTO;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    isLoadingUserStorageData: boolean;
    signOut: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps) //criado o contexto que será passado para o elemento filho

type AuthContextProviderProps = {
    children: ReactNode; //reactnode vai permitir eu renderizar qualquer coisa como filho do componente
}

export function AuthContextProvider({children} : AuthContextProviderProps) {//vou passar essa children com o auth no app para levar o contexto do filho pro pai
 
    const [user, setUser] = useState<UserDTO>({} as UserDTO); 
    const [isLoadingUserStorageData, setIsLoadingUserStorage] = useState(true);



    async function userAndTokenUpdate(userData: UserDTO, token: string) {
       
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setUser(userData);

    }
    
    async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
        try{
            setIsLoadingUserStorage(true);

            await storageUserSave(userData);
            await storageAuthTokenSave({token, refresh_token});

        } catch(error) {
            throw error;
        } finally {
            setIsLoadingUserStorage(false)
        }
    }

    async function signIn(email:string, password:string){ //quando o usuário faz autentication no signIn...
        try {

           const { data } = await api.post('./sessions', {email, password}); //quero passar pro Back email e senha, e recuperar a response da back end, posso desetruturar os dados que o back vai retornar.

           if(data.user && data.token && data.refresh_token){
            await storageUserAndTokenSave(data.user, data.token, data.refresh_token); //...nós armazenamos o dado do usuário no dispositivo.
            userAndTokenUpdate(data.user, data.token);
           }
       } catch(error) {
         throw error;
       } finally {
        setIsLoadingUserStorage(false);
       }
    }

    async function signOut() {//no signOut removemos o usuário e o token
         try{

            setIsLoadingUserStorage(true); 

            setUser({} as UserDTO); //não tem usuário
            await storageUserRemove(); //importei a função que criei AuthContext e trouxe o contexto de remove dela para cá
            await storageAuthTokenRemove();

        }catch(error) {
            throw error;
        }finally {
            setIsLoadingUserStorage(false)
        } 
    }

    async function updateUserProfile(userUpdated: UserDTO) {
        try {
            setUser(userUpdated); //atualizamos o dado do usuário 
            await storageUserSave(userUpdated);// e no async storage no dispositivo.

        } catch (error) {
            throw error;
        }
    }


    async function loadUserData() {

        try {
        setIsLoadingUserStorage(true);

        const userLogged = await storageUserGet();
        const { token } = await storageAuthTokenGet();

            if(token && userLogged){
                userAndTokenUpdate(userLogged, token);
            }
        } catch(error) {
            throw error;
        } finally {
            setIsLoadingUserStorage(false);
        }
    }
 
    useEffect(() => { //useeffect é executado após a primeira renderização e depois a cada atualização.
        loadUserData();
    }, [])


    return (
            <AuthContext.Provider value={{
                user, 
                signIn,
                signOut,
                updateUserProfile,
                isLoadingUserStorageData,
            }}>
                {children}
            </AuthContext.Provider>
    )
}