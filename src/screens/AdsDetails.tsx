import React, { useState } from "react";
import { VStack, Text, HStack, Box, Center} from "native-base";

import { AntDesign } from '@expo/vector-icons'; 

import ProductImageSVG from "../assets/ProductImage.svg"
import { Photo } from "../components/Photo";
import { ImageBackground, Touchable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "src/hooks/useAuth";
import { AppNavigatorRoutesProp } from "src/routes/app.routes";


export function AdsDetails() {

    const[userPhoto, setUserPhoto] = useState("https://images.pexels.com/photos/17897079/pexels-photo-17897079/free-photo-of-adulto-garoto-menino-rapaz.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    //const { home } = useAuth();
    const navigation = useNavigation<AppNavigatorRoutesProp>();

    function goBackToHome()  {
        navigation.navigate("home")
    }

    return(
        <VStack mt={10} >
            <VStack mb={3} ml={6}>
                <TouchableOpacity onPress={goBackToHome}>
                    <AntDesign name="arrowleft" size={26} color="gray.100" />
                </TouchableOpacity>
            </VStack>
            
            <Center borderColor="blueGray.100">
                <ProductImageSVG/>
            </Center>
            
            <VStack>
                <HStack alignItems="center">
                    <Photo size={12} source={{uri: userPhoto}} mt={6} ml={6}/>
                    <Text ml={6} mt={3} color="gray.100" fontFamily="heading" fontSize={16}>
                        Makenji Batista
                    </Text>
                </HStack>
            </VStack>
            <Box bgColor="gray.200" borderRadius={50} position="absolute" zIndex={1} top={420} right={80}>
                    <Text color="gray.700" p={1} fontSize={12}>USADO</Text>
            </Box>
        </VStack>
    )
}