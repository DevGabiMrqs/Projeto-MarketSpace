import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

//Aqui no index em Routes passamos as rotas de:
//aplicação para o user que já está autenticado e tem acesso as telas do app e 
//autenticação para o user der o signUp.


export function Routes() {


    return(
        <NavigationContainer> 
            <AuthRoutes/>
        </NavigationContainer> //levando as Routes para o AppTsx
    )
}