import React from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { SignIn } from "./src/screens/SignIn";
import { SignUp } from "./src/screens/SignUp";
import { THEME } from "./src/theme/index";
import { IsLoading } from "./src/components/IsLoading";


export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      
      {fontsLoaded ? <SignIn /> : <IsLoading /> }
    </NativeBaseProvider>
  );
}

