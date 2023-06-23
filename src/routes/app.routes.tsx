import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native/Libraries/Utilities/Platform";
import { useTheme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";


import { Home } from "../screens/Home";
import { AdsDetails } from "../screens/AdsDetails";
import { MyAds } from "../screens/MyAds";
import { DetailsOfMyAds } from "../screens/DetailsOfMyAds";
import { CreateAds } from "../screens/CreateAds";
import { PreVisualOfAds } from "../screens/PreVisualOfAds";
import { EditAds } from "../screens/EditAds";
import { FilterAds } from "../screens/FilterAds";
import { SignOut } from "../screens/SignOut";
import HomeSvg from "../assets/Home.svg"

export type AppRoutesProp = {
   home: undefined,
   filterAds: undefined,
   adsDetails: undefined,
   myAds: undefined,
   detailsOfMyAds: undefined,
   createAds: undefined,
   preVisualOfAds: undefined,
   editAds: undefined,
    signOut: undefined,
}

export type AppNavigatorRoutesProp = BottomTabNavigationProp<AppRoutesProp> //defini um tipo para poder passar as rotas no bottomTab

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProp>()


export function AppRoutes() {

    const { sizes, colors } = useTheme();

    const iconSize = sizes[6]

    return(
        <Navigator
       screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.gray[200],
            tabBarInactiveTintColor: colors.gray[400],
            tabBarStyle: {
            backgroundColor: colors.gray[700],
            borderTopWidth: 0,
            height: Platform.OS === 'android' ? 'auto' : 96,
            paddingBottom: sizes[10],
           paddingTop: sizes[6]
     }

       }}
        >

        <Screen
            name="home"
            component={Home}
            //options={{
               // tabBarIcon:() => (
                  //  <HomeSvg/>
                //)
            //}}
        />

        <Screen 
            name="filterAds"
            component={FilterAds}
        />

        <Screen
            name="adsDetails"
            component={AdsDetails}
        />

        <Screen
            name="detailsOfMyAds"
            component={DetailsOfMyAds}
        />

        <Screen
            name="myAds"
            component={MyAds}
        />

        <Screen
            name="createAds"
            component={CreateAds}
        />

        <Screen
            name="preVisualOfAds"
            component={PreVisualOfAds}
        />
        
        <Screen 
            name="editAds"
            component={EditAds}
        />

        <Screen 
            name="signOut"
            component={SignOut}
        />

        </Navigator>
    )
}