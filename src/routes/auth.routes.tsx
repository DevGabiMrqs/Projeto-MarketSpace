import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"; //lib de react-navigation

import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";



export type AuthRoutes = {
    signIn : undefined;
    signUp : undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>(); //criando o StackNavigator para dar o navigate entre a tela signIn e signUp.

export type AuthNavigatorRoutesProp = NativeStackNavigationProp<AuthRoutes>; //levo essas rotas para as telas


export function AuthRoutes(){ // vou passar essas rotas no index(routes) e chamá-las para termoas acesso ao signIn e o signUp

    return(

        <Navigator>
            <Screen 
            name="signIn" 
            component={SignIn}
            />

            <Screen 
            name="signUp"
            component={SignUp}
            />

        </Navigator> //esse contexto de navegação entre telas será utilizados nas screens. 
    
    );
}