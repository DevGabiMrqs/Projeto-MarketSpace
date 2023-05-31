import React from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import { Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";

import { SignIn } from "./src/screens/SignIn";
import { THEME } from "./src/theme/index";


export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      
      {fontsLoaded ? <SignIn /> : "componente de loading"}
    </NativeBaseProvider>
  );
}

