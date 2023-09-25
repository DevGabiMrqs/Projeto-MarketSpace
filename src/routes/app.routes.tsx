import React from "react";
import { Platform } from "react-native";
import { useTheme } from "native-base";

import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { AdsDetails } from "../screens/AdsDetails";
import { MyAds } from "../screens/MyAds";
import { DetailsOfMyAds } from "../screens/DetailsOfMyAds";
import { CreateAds } from "../screens/CreateAds";
import { PreVisualOfAds } from "../screens/PreVisualOfAds";
import { EditAds } from "../screens/EditAds";
import { SignOut } from "../screens/SignOut";
import HomeSvg from "../assets/Home.svg"
import BuySvg from "../assets/Buy.svg"
import SignOutSvg from "../assets/SignOut.svg"

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
            tabBarActiveTintColor: colors.gray[100],
            tabBarInactiveTintColor: colors.gray[600],
            tabBarStyle: {
            backgroundColor: colors.gray[700],
            borderTopWidth: 0,
            height: Platform.OS === 'android' ? 'auto' : 96,
            paddingBottom: sizes[6],
            paddingTop: sizes[6]
            }
        }
    }>

        <Screen
            name="home"
            component={Home}
            options={{
               tabBarIcon:({color}) => (
                   <HomeSvg fill={color} width={iconSize} height={iconSize} style={{marginLeft: 84}}/>
                )
            }}
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
            options={{
                tabBarIcon:({color}) => (
                    <BuySvg fill={color} width={iconSize} height={iconSize}/>
                )
            }}
        />

        <Screen
            name="createAds"
            component={CreateAds}
            options={{ tabBarButton: () => null }}
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
            options={{
                tabBarIcon: ({color}) => (
                    <SignOutSvg fill={color} width={iconSize} height={iconSize} style={{marginRight: 84}}/>
                )
            }}
        />

        </Navigator>
    )
}