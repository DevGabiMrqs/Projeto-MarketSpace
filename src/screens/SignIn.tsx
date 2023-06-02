import React from "react";
import { VStack, Text, Center, Box, View } from "native-base";

import LogoSvg from "../assets/Logo.svg";
import { Input } from "../components/Input";

export function SignIn() {


    return (
        <VStack bgColor="gray.600">
            <Center py={77}>
                <Box>
                <LogoSvg/>
                </Box>
                <Text 
                color="gray.100"
                fontFamily="heading"
                fontSize={36}
                fontWeight="extrabold"
                letterSpacing={-1.5}>
                    marketspace 
                </Text>
                <Text color="gray.300" fontFamily="body" pb={100}>
                    Seu espaço de compra e venda 
                </Text>
                
                <Text color="gray.100" fontFamily="body" pb={5} >
                    Acesse sua conta
                </Text>

            </Center>
        </VStack>
    );
}