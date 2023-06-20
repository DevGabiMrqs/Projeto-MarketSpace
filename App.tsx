import React from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { THEME } from "./src/theme/index";
import { IsLoading } from "./src/components/IsLoading";
import { Routes } from "../marketspace/src/routes/index";
import { SignUp } from "../marketspace/src/screens/SignUp";
import { SignIn } from "./src/screens/SignIn";
import { AuthRoutes } from "./src/routes/auth.routes";


export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      
      {fontsLoaded ? <Routes/> : <IsLoading /> }
      
    </NativeBaseProvider>
  );
}

