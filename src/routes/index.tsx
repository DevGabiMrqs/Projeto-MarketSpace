import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";
import { IsLoading } from "../components/IsLoading";
import { AppRoutes } from "./app.routes";
import { Box } from "native-base";

//Aqui no index em Routes passamos as rotas de:
//aplicação para o user que já está autenticado e tem acesso as telas do app e 
//autenticação para o user der o signUp.

export function Routes() {

    const {user, isLoadingUserStorageData} = useAuth();

    if(isLoadingUserStorageData) {
        return <IsLoading />
    }


    return(
        <Box flex={1}>
            <NavigationContainer> 
            { user ? <AppRoutes/> : <AuthRoutes/> } 
            </NavigationContainer>
        </Box>
    )
}