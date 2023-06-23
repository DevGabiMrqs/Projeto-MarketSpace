import React from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { THEME } from "./src/theme/index";
import { IsLoading } from "./src/components/IsLoading";
import { AuthRoutes } from "./src/routes/auth.routes";

export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      
      {fontsLoaded ? <AuthRoutes/> : <IsLoading /> }
      
    </NativeBaseProvider>
  );
}

