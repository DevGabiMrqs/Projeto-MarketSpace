import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts } from "expo-font";
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { THEME } from "./src/theme/index";
import { IsLoading } from "./src/components/IsLoading";
import { AuthRoutes } from "./src/routes/auth.routes";
import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes/index";
import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
      <NativeBaseProvider theme={THEME}>

        <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        />


        <AuthContextProvider>
          {fontsLoaded ? <Routes/> : <IsLoading /> }
        </AuthContextProvider>
      </NativeBaseProvider>
  );
}

