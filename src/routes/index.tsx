import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";
import { IsLoading } from "../components/IsLoading";
import { AppRoutes } from "./app.routes";
import { Box, View, useTheme } from "native-base";

//Aqui no index em Routes passamos as rotas de:
//aplicação para o user que já está autenticado e tem acesso as telas do app e 
//autenticação para o user der o signUp.

export function Routes() { 

    const {colors} = useTheme();
    const theme = DefaultTheme
    theme.colors.background = colors.gray[600]
    const {user, isLoadingUserStorageData} = useAuth();

    if(isLoadingUserStorageData) {
        return <IsLoading />
    }

    return(
        <Box flex={1} >
            <NavigationContainer theme={theme}> 
            { user.id ? <AppRoutes/> : <AuthRoutes/> } 
            </NavigationContainer>
        </Box>
    )
}