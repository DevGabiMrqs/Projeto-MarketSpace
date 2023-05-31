import React from "react";
import { VStack, Text, Center, Box } from "native-base";

import LogoSvg from "../assets/Logo.svg"
import MarketSpaceSvg from "../assets/marketspace.svg"


export function SignIn() {


    return (
        <VStack>
            <Center py={75}>
                <Box>
                <LogoSvg/>
                </Box>
                <MarketSpaceSvg />
                <Text color="gray.300" fontFamily="body">
                    Seu espaço de compra e venda 
                </Text> 
            </Center>
        </VStack>
    );
}